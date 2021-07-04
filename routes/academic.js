const express = require('express');

const Academic = require('../model/academic.model');
const checkCategoryinfo = require('../security/checkCategoryinfo');

const routes = express.Router();

//set main.html handler for category of books
routes.route('/category')
    .get(async (req, res, next) => {
        try {
            const category = await Academic.find();
            if (category == null ) {
                const error = new Error('کتابی یافت نشد');
                error.statusCode = 404;
                throw error;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(category);

        } catch(err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
          await checkCategoryinfo.validate(req.body);
          await Academic.create(req.body);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({message: 'موارد با موفقیت در بانک اطلاعاتی ذخیره شد'});
        } catch (err) {
            next(err);
        }
    });

routes.route('/:cId/books')
    .get(async (req, res, next) => {
        try {
            const academics = await Academic.findById(req.params.cId)
            if (academics != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(academics.books);
            } else {
                const error = new Error('دسته انتخابی صحیح نمی باشد');
                error.statusCode = 404;
                throw error;
            }
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const academics = await Academic.findById(req.params.cId);
            if (academics != null) {
                academics.books.push(req.body);
                await academics.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({message: 'کتاب با موفقیت ذخیره شد'});
            } else {
                const error = new Error('دسته انتخابی صحیح نمی باشد');
                error.statusCode = 404;
                throw error;
            }

        } catch (err) {
            next(err);

        }
    })
    .put(async (req, res, next) => {
    res.statusCode = 403;
    res.end('مجوز این عملیات وجود ندارد');
    })
    .delete(async (req, res, next) => {
        res.statusCode = 403;
        res.end('مجوز این عملیات وجود ندارد');
    });

routes.route('/:cId/books/:bookId')
    .get(async (req, res, next) => {
        try {
            const academics = await Academic.findById(req.params.cId);
            if (academics != null && academics.books.id(req.params.bookId) != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(academics.books.id(req.params.bookId));
            } else if (academics == null) {
                const error = new Error('دسته انتخابی صحیح نمی باشد');
                error.statusCode = 404;
                throw error;
            } else {
                const error = new Error('کتابی یافت نشد');
                error.statusCode = 404;
                throw error;
            }

        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        res.statusCode = 403;
        res.end('مجوز این عملیات وجود ندارد');
    })
    .put(async (req, res, next) => {
        try {
            const academics = await Academic.findById(req.params.cId);
            if (academics != null && academics.books.id(req.params.bookId) != null) {
                if (req.body.title) {
                    academics.books.id(req.params.bookId).title = req.body.title;
                }
                if (req.body.author) {
                    academics.books.id(req.params.bookId).author = req.body.author;
                }
                if (req.body.imageUrl) {
                    academics.books.id(req.params.bookId).imageUrl = req.body.imageUrl;
                }
                if (req.body.pdfUrl) {
                    academics.books.id(req.params.bookId).pdfUrl = req.body.pdfUrl;
                }
                if (req.body.description) {
                    academics.books.id(req.params.bookId).description = req.body.description;
                }
                if (req.body.fullVersion) {
                    academics.books.id(req.params.bookId).fullVersion = req.body.fullVersion;
                }
               await academics.save();
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({message:'بروزرسانی با موفقیت انجام پذیرفت', status: 'success'});
            } else if (academics == null) {
                const error = new Error('دسته انتخابی صحیح نمی باشد');
                error.statusCode = 404;
                throw error;
            } else {
                const error = new Error('کتابی یافت نشد');
                error.statusCode = 404;
                throw error;
            }
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const academics = await Academic.findById(req.params.cId);
            if (academics != null && academics.books.id(req.params.bookId) != null) {
                academics.books.id(req.params.bookId).remove();
                await academics.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({message:'حذف با موفقیت انجام پذیرفت', status: 'success'});
            } else if (academics == null) {
                const error = new Error('دسته انتخابی صحیح نمی باشد');
                error.statusCode = 404;
                throw error;
            } else {
                const error = new Error('کتابی یافت نشد');
                error.statusCode = 404;
                throw error;
            }
        } catch (err) {
            next(err);
        }
    });


module.exports = routes;
