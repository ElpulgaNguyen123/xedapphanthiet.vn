var pool = require('../../../config/connectDb');
var app = require('../../../config/app');
var service = require('../../../../services');
var multer = require('multer');
var { uuid } = require('uuidv4');
var { Transuccess, saveSuccess, deleteSuccess } = require('../../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, app.directory_endows);
    },
    filename: function (req, file, cb) {
        // let match = app.avatar_type;
        let match = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        cb(null, file.originalname);
    }
});
var productUploadFile = multer({ storage: storage }).single('endow_image');
// get all Blog
let getAllEndow = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM endow', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/website/endow/endow', {
                title: 'Ưu đãi',
                endows: rows,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: req.user
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

// dẫn đến trang thêm blog
let addEndowGet = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var user = req.user || {};
        res.render('admin/website/endow/endow-add', {
            title: 'Thêm Ưu đãi',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// thêm hình ảnh cho thương hiệu
let addEndowPost = (req, res, next) => {
    productUploadFile(req, res, (error) => {
        try {
            console.log(req.body);
            var arrayError = [],
                successArr = [];
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(200, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, (err, info) => {
                        fs.unlinkSync(req.file.path);
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            var queryNew = `INSERT INTO endow (title, image, description) VALUES ?`;
            var endowValues = [
                [req.body.endow_title,
                    filename,
                req.body.endow_description]
            ];

            pool.query(queryNew, [endowValues], function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.createSuccess('Blog'));
                req.flash('Success', successArr);
                res.redirect('/admin/endow');
            });
        } catch (error) {
            console.log(error);
            res.render('admin/notfound/notfound', {
                title: 'Trang Không tìm thấy'
            });
        }
    })
}
// lấy thông tin chỉnh sửa thương hiệu
let getEditEndow = async (req, res, next) => {
    try {
        var endow_id = req.params.id;
        var arrayError = [],
            successArr = [];
        var query = `SELECT * FROM endow WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        await pool.query(query, endow_id, function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/website/endow/endow-edit', {
                title: 'Chỉnh sửa Ưu đãi',
                endow: rows[0],
                user: req.user,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// lấy thông tin chỉnh sửa thương hiệu gửi lên update lên server
let postEditEndow = (req, res, next) => {
    productUploadFile(req, res, async (error) => {
        try {
            // Lấy tất cả sản phẩm và hiển thị ra table
            var arrayError = [],
                successArr = [];
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(200, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, async (err, info) => {
                        fs.unlinkSync(req.file.path);
                        if (req.body.endow_old_image) {
                            await fsExtras.remove(`${app.directory_endows}/${req.body.endow_old_image}`);
                        }
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            else if (req.body.endow_old_image) {
                filename = `${req.body.endow_old_image}`;
            }
            var queryUpdate = `
            UPDATE endow
            SET title = ?, 
            image = ?, 
            description = ?
            WHERE id = ?`
            var endowValues = [
                req.body.endow_title,
                filename,
                req.body.endow_description,
                req.params.id
            ]
            console.log(endowValues);
            await pool.query(queryUpdate, endowValues, function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.saveSuccess('BLog'));
                req.flash('Success', successArr);
                res.redirect('/admin/endow');
            });
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = {
    getAllEndow,
    addEndowGet,
    addEndowPost,
    getEditEndow,
    postEditEndow
};