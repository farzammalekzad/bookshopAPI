const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporterDetail = smtpTransport({
    host: 'mail.mohammad-malekzad.ir',
    port: 465,
    secure: true,
    auth: {
        user: 'contact@mohammad-malekzad.ir',
        pass: 'Developer1365'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = (email, name, subject, message) => {
    const transporter = nodeMailer.createTransport(transporterDetail);
    transporter.sendMail({
        from: 'contact@mohammad-malekzad.ir',
        to: email,
        subject: subject,
        html: `<h1>سلام ${name}</h1>
                <p>${message}</p>`
    });
}

module.exports = sendEmail;
