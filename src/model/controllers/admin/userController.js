var express = require('express');
var multer = require('multer');
var app = require('../../config/app');
var { uuid } = require('uuidv4');
var pool = require('../../config/connectDb');
var { Transuccess } = require('../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // đưa đường dẫn chính xác để có thể update dữ liệu
        cb(null, app.directory_auth);
    },
    filename: function (req, file, cb) {
        // check file type
        let match = app.avatar_type;
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        // để tránh trùng tên thì cho thêm uuid và trùng thời gian thì dùng Date.Now();
        let fileName = `${file.fieldname}-${uuid()}-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

var avatarUploadFile = multer({ storage: storage }).single('user_image');
let updateUserData = (req, res, next) => {
    avatarUploadFile(req, res, async (error) => {
        try {
            var arrayError = [],
                successArr = [];
            var filename = '';
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(300, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, async (err, info) => {
                        fs.unlinkSync(req.file.path);
                        if (req.body.auth_old_image) {
                            await fsExtras.remove(`${app.directory_auth}/${req.body.auth_old_image}`);
                        }
                    });

                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            else if (req.body.auth_old_image) {
                filename = `${req.body.auth_old_image}`;
            }
            var queryUpdate = `
            UPDATE user
            SET name = ?, 
            phone = ?,
            email = ?,
            address = ?,
            facebook = ?,
            instagram = ?, 
            avatar = ?
            WHERE user_id = ?`;
            var userValues = [
                req.body.username,
                req.body.phone,
                req.body.email,
                req.body.address,
                req.body.profile_facebook,
                req.body.profile_instagram,
                filename,
                req.params.id
            ];
            await pool.query(queryUpdate, userValues, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    return res.status(500).send(error);
                }
                successArr.push(Transuccess.saveSuccess('thông tin người dùng'));
                req.flash('Success', successArr);
                res.redirect(`/admin/user/${req.params.id}`);
            });
        } catch (error) {
            arrayError.push('Có lỗi xảy ra');
            req.flash('errors', arrayError);
            res.redirect('/admin');
        }
        // Everything went fine.
    })
}

// Update user data
let updateUserAvatar = async (req, res, next) => {
    try {
        let userItem = {};
        userItem.name = req.body.name || '';
        userItem.phone = req.body.phone || '';
        userItem.email = req.body.email || '';
        userItem.address = req.body.address || '';
        userItem.facebook = req.body.profile_facebook || '';
        userItem.instagram = req.body.profile_instagram || '';
        var queryUser = `UPDATE user SET name = ?, phone = ?, email = ?, address = ? WHERE user_id = '${req.params.id}'`;
        pool.query(queryUser, [userItem.name, userItem.phone, userItem.email, userItem.address, userItem.profile_facebook,
        userItem.profile_instagram
        ], async function (error, rows, fields) {
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(200).send(Transuccess.user_updated);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// Get user info for show
let getUser = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var user = req.user || {};
        res.render('admin/user/user', {
            title: 'Thông tin người dùng',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: user
        })
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin');
    }
}

module.exports = {
    updateUserAvatar,
    updateUserData,
    getUser
}