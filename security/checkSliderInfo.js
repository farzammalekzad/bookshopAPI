const Yup = require('yup');

const checkSliderInfo = Yup.object().shape({
    sliderName: Yup.string().min(4).required(),
    sliderImageUrl: Yup.string().required(),
    description: Yup.string().min(10).max(255).required(),
    link: Yup.string(),
    status: Yup.boolean()
});

module.exports = checkSliderInfo;
