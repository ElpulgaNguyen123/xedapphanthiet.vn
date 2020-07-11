var nodeMailer = require('nodemailer');
let sendMailAdmin = (mailOptions ) => {

    let adminMailer = process.env.MAILER_EMAIL;
    let adminPassword = process.env.MAILER_PASSWORD;
    let adminHost = process.env.MAILER_HOST;
    let adminPort = process.env.MAILER_PORT;

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'nguyenhoangthang635@gmail.com',
            pass: 'Leo769183'
        },
        tls: {
            // từ chối nhận diện
            rejectUnauthorized: false,
        }
    };
    let transporter = nodeMailer.createTransport(smtpConfig);
    // thông tin gửi mail     
    return  transporter.sendMail(mailOptions);
}

module.exports = sendMailAdmin