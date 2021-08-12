const mongoose = require('mongoose');

const appsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    bazaarLink: {
        type: String,
        required: true
    }
});

const Apps = mongoose.model('Apps', appsSchema);

module.exports = Apps;
