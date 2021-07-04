const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    fullVersion: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const academicSchema = new mongoose.Schema({
    field: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    books: [bookSchema]
});

const Academic = mongoose.model('Academic', academicSchema);

module.exports = Academic;
