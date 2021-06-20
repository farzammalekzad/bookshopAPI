const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/usermodel');
const checkUser = require('../security/checkregisterinfo');

const routes = express.Router();


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
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({message: 'اکانت شما با موفقیت ثبت شد'})

        } catch (err) {
            err.statusCode = 403;
            next(err);
        }
    });

routes.route('/login')
    .post(async (req, res, next) => {
        
    })


module.exports = routes;
