const express = require('express');
const multer = require('multer');
const path = require("path");

const routes = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/images/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const storagePdf = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/books/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const imageFileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback('فرمت مورد پذیرش JPEG یا PNG می باشد', false);
    }
};

const pdfFileFilter = (req, file, callback) => {
    if (path.extname(file.originalname) !== '.pdf' || path.extname(file.originalname) !== '.epub') {
        callback(new Error('فرمت مورد پذیرش PDF یا EPUB می باشد'));
    }
    else {
        callback(null, true);
    }
};

const uploadImage = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    dest: 'uploads/images/'
}).single('image');

const uploadPdf = multer({
    storage: storagePdf,
    dest: 'uploads/books/'
}).single('book');

routes.route('/image')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'})
    })
    .post(uploadImage, (req, res, next) => {
        const filename = req.file.originalname;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(`http://localhost:3000/uploads/images/${filename}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    });

routes.route('/book')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'})
    })
    .post(uploadPdf, (req, res, next) => {
        const filename = req.file.originalname;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        setTimeout(() => {
            res.json( `http://localhost:3000/uploads/books/${filename}`);
        }, 3000);

    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    });

module.exports = routes
