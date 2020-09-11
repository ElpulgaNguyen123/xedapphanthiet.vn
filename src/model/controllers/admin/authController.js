var pool = require('../../config/connectDb');
var { validationResult } = require("express-validator");
var { register_service, resetpassword_service } = require('../../../services');
var { TranAuthSuccess, Transuccess, Tranerrors, tranMail, tranvalidation_resetPassword } = require('../../../../lang/vi');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// login authencation
let loginController = (req, res, next) => {
    res.render('admin/auth/login', {
        title: 'Đăng nhập',
        errors: req.flash('Errors'),
        success: req.flash('Success')
    })
};
let registerController = (req, res, next) => {
    res.render('admin/auth/register', {
        title: 'Đăng nhập',
        errors: req.flash('Errors'),
        success: req.flash('Success')
    })
}
let resetPasswordController = (req, res, next) => {
    res.render('admin/auth/reset-password', {
        title: 'Đổi mật khẩu',
        errors: req.flash('Errors'),
        success: req.flash('Success')
    })
}
let changePasswordController = (req, res, next) => {
    res.render('admin/auth/change-password', {
        title: 'Đổi mật khẩu',
        token: req.params.token,
        errors: req.flash('Errors'),
        success: req.flash('Success')
    })
}
let PostRegisterController = async (req, res, next) => {
    // return lisr data form
    let validationError = validationResult(req);
    var arrayError = [],
        successArr = [];
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        let errors = validationError.mapped(); // return object
        const errorsArr = Object.values(errors);
        errorsArr.forEach((item) => {
            arrayError.push(item.msg); // add vào mảng lỗi
        })
        // Take error ro Flash
        req.flash("Errors", arrayError);
        return res.redirect('/admin/register');
    }
    var user = register_service(
        req.body.email,
        req.body.password,
        req.protocol,
        req.get('host'));

    user.then(function (result) {
        successArr.push(result);
        req.flash('Success', successArr);
        return res.redirect('/admin/login');

    }).catch(function (error) {
        console.log(error);
        arrayError.push(error);
        req.flash('Errors', arrayError);
        return res.redirect('/admin/register');
    });
}

let PostResetPasswordController = async (req, res, next) => {
    // return list data form
    let validationError = validationResult(req);
    var arrayError = [],
        successArr = [];
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        let errors = validationError.mapped(); // return object
        const errorsArr = Object.values(errors);
        errorsArr.forEach((item) => {
            arrayError.push(item.msg); // add vào mảng lỗi
        });
        // Take error to Flash
        req.flash("Errors", arrayError);
        return res.redirect('/admin/reset-password');
    }
    var user = resetpassword_service(
        req.body.email,
        req.protocol,
        req.get('host'));

    user.then(function (result) {
        successArr.push(result);
        req.flash('Success', successArr);
        return res.redirect('/admin/reset-password');

    }).catch(function (error) {
        console.log(error);
        arrayError.push(error);
        req.flash('Errors', arrayError);
        return res.redirect('/admin/reset-password');
    });
}

let resetPasswordGetToken = async (req, res, next) => {
    var query = `SELECT * FROM user WHERE verifyToken = '${req.params.token}'`;
    await pool.query(query, function (error, rows, fields) {
        if (error) throw error;
        if (!rows[0]) {
            return res.redirect('/admin/reset-password');
        }
        return res.redirect(`/admin/change-password/${req.params.token}`);
    })
}

let changePassword = async (req, res, next) => {

    let validationError = validationResult(req);
    var arrayError = [],
        successArr = [];
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        let errors = validationError.mapped(); // return object
        const errorsArr = Object.values(errors);
        errorsArr.forEach((item) => {
            arrayError.push(item.msg); // add vào mảng lỗi
        });
        // Take error to Flash
        req.flash("Errors", arrayError);
        return res.redirect('/admin/change-password/'+req.params.token);
    }
    var salt = bcrypt.genSaltSync(saltRounds);
    var newPassword = bcrypt.hashSync(req.body.password, salt);
    var query = `UPDATE user SET user_password = ? WHERE verifyToken = '${req.params.token}'`;
    await pool.query(query,[newPassword], function (error, rows, fields) {
        if (error) throw error;
        successArr.push(Transuccess.reset_passwordsuccess);
        req.flash('Success', successArr);
        return res.redirect('/admin/login');
    })
}

let getLogout = (req, res, next) => {
    req.logout();
    req.flash('Success', Transuccess.logout_success);
    res.redirect('/admin/login');
}

let checkloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/admin/login");
    }
    next();
}
let checkloggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/admin");
    }
    next();
}

module.exports = {
    loginController,
    registerController,
    PostRegisterController,
    resetPasswordController,
    PostResetPasswordController,
    resetPasswordGetToken,
    changePasswordController,
    changePassword,

    checkloggedOut,
    checkloggedIn,
    getLogout
}