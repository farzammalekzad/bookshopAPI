const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/usermodel');
const checkUser = require('../security/checkregisterinfo');
const sendEmail = require('../utils/mail');
const {authenticate} = require("../middlewares/auth");

const routes = express.Router();

const secret = 'SECRET';

routes.route('/register')
    .post(async (req, res, next) => {
        try {
            await checkUser.validate(req.body);
            const user = await User.findOne({email: req.body.email});
            if (user) {
                const error = new Error('ایمیل قبلا ثبت شده است');
                error.statusCode = 422;
                throw error;
            }
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPass;
            await User.create(req.body);
            sendEmail(req.body.email, req.body.name, 'شما در سایت ثبت نام شده اید', 'خیلی خوشحالیم که به سایت کتاب های تخصصی ملحق شدید');
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json({message: 'اکانت شما با موفقیت ثبت شد'})

        } catch (err) {
            err.statusCode = 403;
            next(err);
        }
    });

routes.route('/login')
    .post(async (req, res, next) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                const error = new Error('کاربری یافت نشد');
                error.statusCode = 404;
                throw error;
            }
            const checkPass = await bcrypt.compare(req.body.password, user.password);
            if (checkPass) {
                const token = jwt.sign({
                    user: {
                        userId: user._id.toString(),
                        email: user.email,
                        name: user.name
                    }
                }, secret, {
                    expiresIn: "1h"
                });
                res.statusCode = 200;
                res.json({status: 'success', message: 'ورود با موفقیت انجام شد', token, name: user.name})
            } else {
                const error = new Error('نام کاربری یا رمز عبور صحیح نمی باشد');
                error.statusCode = 401;
                throw error;
            }

        } catch (err) {
            next(err);
        }


    });

routes.route('/forget-password')
    .post(async (req, res, next) => {
        try {
          const user = await User.findOne({email: req.body.email});
          if (!user) {
              const error = new Error('کاربری با این ایمیل ثبت نشده است');
              error.statusCode = 404;
              throw error;
          }
          const token = jwt.sign({
              userId: user._id.toString(),
              email: user.email
          }, secret, {expiresIn: '1h'});
          const resetLink = `http://localhost:3000/user/reset-password/${token}`;
          sendEmail(user.email, user.name, 'بازگردانی کلمه عبور', `برای تغییر رمز بر روی این لینک کلیک کنید<br> ${resetLink}` );
          res.statusCode = 200;
          res.json({message: 'ایمیل تغییر رمز عبور ارسال شد'});

        } catch (err) {
            next(err);
        }
    });

routes.route('/reset-password/:token')
    .post(async (req, res, next) => {
       const {password, confirmPassword} = req.body;
        try {
            if (password !== confirmPassword) {
                const error = new Error('رمز عبور باید با تکرار رمز عبور یکسان باشد');
                error.statusCode = 422;
                throw error;
            }
            const token = req.params.token;
            const decodedToken = await jwt.verify(token, secret);
            if (!decodedToken) {
                const error = new Error('شما برای انجام این عملیات مجوز ندارید!!');
                error.statusCode = 404;
                throw error
            }
            const user = await User.findOne({_id: decodedToken.userId});
            if (!user) {
                const error = new Error('کاربری یافت نشد');
                error.statusCode = 404;
                throw error;
            }
            user.password = await bcrypt.hash(password, 10);
            await user.save();
            res.statusCode = 200;
            res.json({message: 'تغییر رمز با موفقیت انجام شد'});

        } catch (err) {
            next(err);
        }
    });

routes.get('/checkToken', async (req, res, next) => {
    const authHeader = req.get('Authorization');
    try {
        if (!authHeader) {
            const error = new Error('شما مجوز ندارید');
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET');
        if (!decodedToken) {
            const error = new Error('شما مجوز ندارید');
            error.statusCode = 401;
            throw error;
        }
        let checkedUser = decodedToken.user;
        res.json({message: 'توکن معتبر می‌باشد', status: 'success', token, name: checkedUser.name});
    } catch (err) {
        res.json({message: 'توکن معتبر نیست', status: 'failed'});
    }
});

module.exports = routes;
