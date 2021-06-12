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
                console.log(err);
            });
        }).catch((err) => {
        console.log(err);
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({message: 'داده های ورودی مجددا بررسی و ارسال شود', status: 'failed'});
    });

});

// get slider information
routes.get('/', (req, res, next) => {
    Slider.find()
        .then((sliders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(sliders);
        }).catch((err) => {
            console.log(err);
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
            console.log(err);
    })
});




module.exports = routes;
