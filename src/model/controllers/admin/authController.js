var { validationResult } = require("express-validator");
var { register_service, resetpassword_service } = require('../../../services');
var { TranAuthSuccess, Tranerrors, tranMail,tranvalidation_resetPassword} = require('../../../../lang/vi');

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
        console.log('Lỗi chỗ này nek');
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

let resetPasswordGetToken = (req, res, next) => {
    console.log(req.params.token);
}

let getLogout = (req, res, next) => {
    req.logout(); // hàm được hỗ trợ bởi passport
    req.flash('Success', Transuccess.logout_success);
    res.redirect('/admin/login');
}

let checkloggedIn = (req, res, next) => {
    // hàm Authenticated là hàm của passport.
    if (!req.isAuthenticated()) {
        return res.redirect("/admin/login");
    }
    next(); // hàm next() chuyển sang function tiếp theo.
}

let checkloggedOut = (req, res, next) => {
    // hàm Authenticated là hàm của passport.
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

    checkloggedOut,
    checkloggedIn,
    getLogout
}