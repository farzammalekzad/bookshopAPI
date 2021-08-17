const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: false
    }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
