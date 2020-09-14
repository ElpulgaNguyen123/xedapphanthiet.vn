var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');
var { tranMail } = require('../../../../lang/vi');
var nodeMailer = require('nodemailer');

let FrContactController = async (req, res, next) => {
    try {
        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if (user[0]) {
            userInfo = user[0];
        }
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/contact/contact', {
            title: 'Liên hệ',
            userInfo: userInfo,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let FrSendmailController = async (req, res, next) => {
    try {
        let customer = {};
        res.send(customer)
        var queryUser = 'SELECT * FROM user';

        // var smtpConfig = {
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: 'nguyenhoangthang635@gmail.com',
        //         pass: 'Leo769183'
        //     },
        //     tls: {
        //         rejectUnauthorized: false,
        //     }
        // };
        // let transporter = nodeMailer.createTransport(smtpConfig);
        // let options = {
        //     from: email,
        //     to: email,
        //     subject: tranMail.subject,
        //     html: tranMail.template(linkVerify)
        // }
        // // Sendmail
        // await transporter.sendMail(options)
        //     .then((success) => {
        //         resolve(tranMail.success(customer));
        //     })
        //     .catch((error) => {
        //         // trường hợp xảy ra xác thực lỗi thì delete user đó
        //         //userModel.removeId(user._id);
        //         reject(tranMail.send_failed);
        //     });
        // // Senmail / end
        // return resolve(Transuccess.user_created(userItem.email));

        // Lấy tất cả sản phẩm và hiển thị ra table
        // res.render('xedapphanthiet/contact/contact', {
        //     title: 'Liên hệ',
        //     userInfo: userInfo,
        //     errors: req.flash('Errors'),
        //     success: req.flash('Success'),
        // })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = { FrContactController, FrSendmailController };