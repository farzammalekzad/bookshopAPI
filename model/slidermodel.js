const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    sliderName: {
        type: String,
        required: true,
        trim: true
    },
    sliderImageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Slider = mongoose.model('slider', sliderSchema);

module.exports = Slider;
