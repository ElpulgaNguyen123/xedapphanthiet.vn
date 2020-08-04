var {check} = require('express-validator');
var {tranvalidation_register,
    tranvalidation_resetPassword} = require('../../lang/vi');

let validateRegister = [
    check('email', tranvalidation_register.email_incorrect).isEmail().trim().withMessage('must be at least 5 chars long'),
    // check('gender', tranvalidation_register.gender_incorrect).isIn(["male", "female"]),
    check('password', tranvalidation_register.password_incorrect).isLength({ min: 6 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
    check('password_confirmation', tranvalidation_register.password_confirm_incorrect).custom((value, { req }) => { return value == req.body.password }),
]

let validateEmailResetpassword = [
    check('email', tranvalidation_resetPassword.email_incorrect).isEmail().trim()
]

let validateChangePassword = [
    check('password', tranvalidation_register.password_incorrect).isLength({ min: 6 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
]
module.exports = {
    validateRegister,
    validateEmailResetpassword,
    validateChangePassword
}