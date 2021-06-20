const Yup = require('yup')

const checkRegisterInfo = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email('ساختار ایمیل صحیح نمی باشد').required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password')]).max(255)
});

module.exports = checkRegisterInfo;
