const express = require('express');

const Request = require('../model/request.model');
const sendEmail = require('../utils/mail');
const {authenticate} = require("../middlewares/auth");

const routes = express.Router();


routes.get('/', authenticate, async (req, res, next) => {
    try {
        const requests = await Request.find();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(requests);
    } catch (err) {
        next(err);
    }
})


routes.post('/', async (req, res, next) => {
    try {
        await Request.create(req.body);
        sendEmail(req.body.email, 'کاربر عزیز', 'ثبت درخواست کتاب', `درخواست شما ثبت شد و پس از بررسی با شما تماس گرفته خواهد شد <br>از طریق شماره 09371474773 با شما در واتس اپ در ارتباط هستیم`);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: 'درخواست با موفقیت ثبت شد', status: 'success'});
    } catch (err) {
        next(err);
    }

});

routes.get('/:requestId', async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.requestId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(request);
    } catch (err) {
        next(err);
    }
});


routes.put('/:requestId', async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.requestId);
        if (request != null) {
            if (req.body.status) {
                request.status = req.body.status
            }
            await request.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({message: 'درخواست بروز شد', status: 'success'})
        }
    } catch (err) {
        next(err);
    }
})



module.exports = routes;
