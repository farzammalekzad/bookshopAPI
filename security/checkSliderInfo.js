const Yup = require('yup');

const checkSliderInfo = Yup.object().shape({
    sliderName: Yup.string().min(4,"حداقل 4 کاراکتر باید ارسال شود").required("تکمیل نام اسلایدر الزامی است"),
    sliderImageUrl: Yup.string().required("تکمیل ادرس اسلایدر الزامی است"),
    description: Yup.string().min(10, "حداقل 10 کارکتر باید ارسال شود").max(255).required("تکمیل توضیحات اسلایدر الزامی است"),
    link: Yup.string(),
    status: Yup.boolean()
});

module.exports = checkSliderInfo;
