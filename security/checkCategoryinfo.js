const Yup = require('yup');

const checkCategoryinfo = Yup.object().shape({
    field: Yup.string().required("تکمیل نام فیلد الزامی است"),
    imageUrl: Yup.string().required("تکمیل آدرس عکس الزامی است"),
    description: Yup.string().min(5, 'توضیحات حداقل 5 کارکتر باید باشد').required("تکمیل توضیحات الزامی است")
})

module.exports = checkCategoryinfo;
