const express = require('express');

const Apps = require('../model/apps.model');

const routes = express.Router();

routes.get('/', async (req, res, next) => {
    try {
        const apps = await Apps.find();
        if (!apps) {
            const error = new Error('اپلیکیشنی یافت نشد');
            error.statusCode = 404;
            throw error;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(apps);
    } catch (err) {
        next(err);
    }
});

routes.post('/', async (req, res, next) => {
    try {
        await Apps.create(req.body);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: 'اپلیکیشن با موفقیت اضافه شد', status: 'success'});
    } catch (err) {
        next(err);
    }
});

routes.delete('/:appId', async (req, res, next) => {
    try {
        await Apps.findByIdAndRemove(req.params.appId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: 'اپلیکیشن با موفقیت حذف شد', status: 'success'});
    } catch (err) {
        next(err);
    }
})

module.exports = routes;
