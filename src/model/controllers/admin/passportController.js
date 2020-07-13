var pool = require('../../config/connectDb');
var passport = require('passport');
var passportLocal = require('passport-local');
var { Transuccess, Tranerrors } = require('../../../../lang/vi');
let LocalStrategy = passportLocal.Strategy;
var bcrypt = require('bcrypt');


let initPassportLocal = () => {
    passport.use(new LocalStrategy(
        {
            usernameFeild: 'username', // 2 trường này lấy từ giao diện người dùng
            passwordField: 'password',
            // lệnh này cho phép đưa req vào.
            passReqToCallback: true
        },
        (req, username, password, done) => {

            var queryUser = `SELECT * FROM user WHERE email = '${username}'`;
            pool.query(queryUser, async function (error, rows, fields) {
                try {
                    if (error) throw error;
                    if (!rows[0]) {
                        console.log('Người dùng không tồn tại !');
                        return done(null, false, req.flash("Errors", Tranerrors.userinvalid));
                    }
                    var user = rows[0];
                    console.log(user);
                    if (user.email = username) {
                        if (user.isActive == 0) {
                            return done(null, false, req.flash("Errors", Tranerrors.account_notActive));// kiểm tra tài khoản đã đăng ký nhưng chưa active.     
                        }
                    }

                    let checkpassword = await bcrypt.compare(password, user.user_password);
                    console.log(checkpassword);
                    if (!checkpassword) {
                        return done(null, false, req.flash("Errors", Tranerrors.login_failed));
                    }

                    return done(null, user, req.flash(Transuccess.Login_success));
                } catch (error) {
                    console.log(error);
                    return done(null, false, req.flash("Errors", Tranerrors.server_error));
                }
            });
            // nếu tất cả ok thì trả vể user cho sesstion

        }
    ));

    // trường hợp xác thực thành công thì mã hóa đưa vào session.
    passport.serializeUser(function (user, done) {
        done(null, user.user_id);
    });

    // giải mã hóa đối chiều dữ liệu
    passport.deserializeUser(function (id, done) {
        var queryUser = `SELECT * FROM user WHERE user_id = '${id}'`;
        pool.query(queryUser, function (error, rows, fields) {
            if (error) throw error;
            if (!rows[0]) {
                return done(null, user);
            }
            return done(error, null);
        })
    });
}

module.exports = {
    initPassportLocal
}