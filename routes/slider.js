const express = require('express');

const Slider = require('../model/slidermodel');
const sliderCheckInfo = require('../security/checkSliderInfo');

const routes = express.Router();

// post slider information
routes.post('/', (req, res, next) => {
    sliderCheckInfo.validate(req.body)
        .then((resp) => {
            Slider.create(req.body)
                .then((sliders) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sliders)
                }).catch((err) => {
                next(err);
            });
        }).catch((err) => {
            let errArr = [];
            err.errors.forEach((e) => {
                errArr.push({
                    message: e
                });
            });
            const error = new Error('خطا در اعتبارسنجی');
            error.data = errArr;
            error.statusCode = 403;
            next(error);
    });

});

// get slider information
routes.get('/', (req, res, next) => {
    Slider.find()
        .then((sliders) => {
            if (!sliders) {
                const error = new Error('اسلایدری یافت نشد');
                error.statusCode = 404;
                throw error;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(sliders);
        }).catch((err) => {
            next(err);
    });
});

// delete slider information
routes.delete('/', (req, res, next) => {
    Slider.deleteMany()
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({message: 'کلیه اطلاعات مربوط به اسلایدرها حذف شد', status: 'success'});
        }).catch((err) => {
            next(err);
    })
});


module.exports = routes;
