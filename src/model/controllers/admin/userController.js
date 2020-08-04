var express = require('express');
var multer = require('multer');
var { app } = require('../../config/app');
var { uuid } = require('uuidv4');
var pool = require('../../config/connectDb');
var {Transuccess} = require('../../../../lang/vi');


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

var avatarUploadFile = multer({ storage: storage }).single('avatar');
let updateUserAvatar = (req, res, next) => {
    avatarUploadFile(req, res, async (error) => {
        try {
            if (req.file) {
                let userUpdate = {
                     avatar : req.file.filename || '',
                }
                var queryUser = `UPDATE user SET avatar = ? WHERE user_id = '${req.params.id}'`;
                await pool.query(queryUser,[userUpdate.avatar
                ],function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                        return res.status(500).send(error);
                    }
                    return res.status(200).send(Transuccess.user_updated);
                });
                // let userUpdate = {
                //     avatar : req.file.filename,
                //     updateAt : Date.now()
                // }
                // // Cập nhật sư, cập nhật hình ảnh và đường dẫn.
                // let olduser = await userModel.findUserById(req.user._id);
                // let userOldAvatar = olduser.avatar; // Path to delete avatar update
                // let userupdate = await userService.updateUserService(req.user._id, userUpdate);
                // await fsExtras.remove(`${app.directory_auth}/${userOldAvatar}`);

                // let result = {
                //     message: Transuccess.user_updated,
                //     imageSrc : req.file.filename
                // }
            }
            return res.status(200).send(Transuccess.userinfoNotChange);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        // Everything went fine.
    })
}

// Update user data
let updateUserData = async (req, res, next) => {
    try {
        let userItem = {};
        userItem.name = req.body.name || '';
        userItem.phone = req.body.phone || '';
        userItem.email = req.body.email || '';
        userItem.address = req.body.address || '';
        var queryUser = `UPDATE user SET name = ?, phone = ?, email = ?, address = ? WHERE user_id = '${req.params.id}'`;
        pool.query(queryUser,[userItem.name, userItem.phone, userItem.email, userItem.address,
        ], async function (error, rows, fields) {
            if (error) {
                console.log(error);
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
        console.log(error);
        return res.status(500).send(error);
    }

}

module.exports = {
    updateUserAvatar,
    updateUserData,
    getUser
}