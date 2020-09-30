var pool = require('../model/config/connectDb');
var bcrypt = require('bcrypt');
var { uuid } = require('uuidv4');
var { Transuccess, Tranerrors, tranMail, TranAuthSuccess } = require('../../lang/vi');
var sendMailAdmin = require('../model/config/sendMail');
var nodeMailer = require('nodemailer');
const saltRounds = 10;

let register_service = (email, password, protocol, host) => {
    // protocol to send the email protocol.
    return new Promise((resolve, reject) => {
        try {
            // kiểm tra trong server xem đã có email này đăng ký chưa
            //let user_check_email_use = await userModel.findByEmail(email);
            var query = `SELECT * FROM user WHERE email = '${email}'`;
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                var checkUserAvaliable = rows[0];
                if (checkUserAvaliable.email = email) {
                    if (checkUserAvaliable.delete_at != null) {
                        return reject(Tranerrors.accout_removed);
                    } else if (checkUserAvaliable.isActive == 0) {
                        return reject(Tranerrors.accout_notActive);// kiểm tra tài khoản đã đăng ký nhưng chưa active.     
                    }
                    return reject(Tranerrors.user_email_inuse);
                }
                // lấy thông tin user
                var salt = bcrypt.genSaltSync(saltRounds);
                let userItem = {
                    user_name: email.split('@')[0],
                    email: email,
                    isActive: false,
                    user_password: bcrypt.hashSync(password, salt),
                    verifyToken: uuid()
                }
                var queryNewUser = "INSERT INTO user(user_name, user_password, email, verifyToken, isActive) VALUES ?";
                var userValues = [
                    [userItem.user_name,
                    userItem.user_password,
                    userItem.email,
                    userItem.verifyToken,
                    userItem.isActive]
                ];
                pool.query(queryNewUser, [userValues], async function (error, results, fields) {
                    if (error) throw error;

                    let linkVerify = `${protocol}://${host}/admin/verify/${userItem.verifyToken}`;
                    let adminMailer = process.env.MAILER_EMAIL;
                    let adminPassword = process.env.MAILER_PASSWORD;
                    let adminHost = process.env.MAILER_HOST;
                    let adminPort = process.env.MAILER_PORT;

                    var smtpConfig = {
                        host: adminHost,
                        port: adminPort,
                        secure: true, // use SSL
                        auth: {
                            user: adminMailer,
                            pass: adminPassword
                        },
                        tls: {
                            // từ chối nhận diện
                            rejectUnauthorized: false,
                        }
                    };
                    let transporter = nodeMailer.createTransport(smtpConfig);
                    let options = {
                        from: email,
                        to: email,
                        subject: tranMail.subject,
                        html: tranMail.template(linkVerify)
                    }
                    // Sendmail
                    await transporter.sendMail(options)
                        .then((success) => {
                            resolve(Transuccess.account_remind_active)
                        })
                        .catch((error) => {
                            // trường hợp xảy ra xác thực lỗi thì delete user đó
                            //userModel.removeId(user._id);
                            reject(tranMail.send_failed);
                        });
                    // Senmail / end
                    return resolve(Transuccess.user_created(userItem.email));
                })
                // Senmail / end
            });

            //return resolve(Transuccess.user_created(userItem.email));
        } catch (error) {
            console.log('caught', error);
        }
    })
}
let resetpassword_service =  (email, protocol, host) => {
    return new Promise((resolve, reject) => {
        try {
            // kiểm tra trong server xem đã có email này đăng ký chưa
            var query = `SELECT * FROM user WHERE email = '${email}'`;
            pool.query(query,async function (error, rows, fields) {

                if (error) throw error;
                if (!rows[0]) {
                    return reject(Tranerrors.emailinvalid);
                }
                var checkUserAvaliable = rows[0];
                if (checkUserAvaliable.email = email) {
                    if (checkUserAvaliable.isActive == 0) {
                        return reject(Tranerrors.accout_notActive);// kiểm tra tài khoản đã đăng ký nhưng chưa active.     
                    }
                }
                let linkVerify = `${protocol}://${host}/admin/reset-password/${checkUserAvaliable.verifyToken}`;
                var smtpConfig = {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: 'nguyenhoangthang635@gmail.com',
                        pass: 'Leo769183'
                    },
                    tls: {
                        rejectUnauthorized: false,
                    }
                };
                let transporter = nodeMailer.createTransport(smtpConfig);
                let options = {
                    from: email,
                    to: email,
                    subject: tranMail.subject,
                    html: tranMail.templateResetPass(linkVerify)
                }
                await transporter.sendMail(options)
                    .then((success) => {
                        console.log('Gửi thành công');
                        return resolve(Transuccess.reset_passwordsendsuccess);
                    })
                    .catch((error) => {
                        return reject(tranMail.send_failed);
                });
                // Senmail / end
            });
            // return resolve(Transuccess.reset_passwordsendsuccess);
        } catch (error) {
            console.log('caught', error);
        }
    })
}
let resetPassword = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            var query = `SELECT * FROM user WHERE verifyToken = '${token}'`;
            pool.query(query, function (error, rows, fields) {
                if (error) throw error;
                if (!rows[0]) {
                    return reject(Tranerrors.emailinvalid);
                }
                resolve(Transuccess.account_actived);
            })
            if (!userVerify) {
                reject(Tranerrors.account_undefind);
            }
        } catch (error) {
            console.log('caught', error);
        }
    })
}
module.exports = {
    register_service,
    resetpassword_service,
    resetPassword
}