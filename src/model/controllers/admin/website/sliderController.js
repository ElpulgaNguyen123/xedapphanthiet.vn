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
        cb(null, app.directory_sliders);
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
var productUploadFile = multer({ storage: storage }).single('slide_image');
// get all products
let getAllSlide = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM `slide', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/website/sliders/slider', {
                title: 'Slide',
                slides: rows,
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

// thêm hình ảnh cho thương hiệu
let addSlide = (req, res, next) => {
    productUploadFile(req, res, (error) => {

        try {
            var arrayError = [],
                successArr = [];
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(300, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, (err, info) => {
                        fs.unlinkSync(req.file.path);
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            var queryNew = "INSERT INTO slide (name, link, image) VALUES ?";
            var slideValues = [
                [req.body.slide_name,
                req.body.slide_link,
                    filename]
            ];
            pool.query(queryNew, [slideValues], function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.createSuccess('Slide'));
                req.flash('Success', successArr);
                res.redirect('/admin/slides');
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
let getEditBrand = async (req, res, next) => {
    try {
        var brand_id = req.params.id;
        var arrayError = [],
            successArr = [];
        var query = `SELECT * FROM brand WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        await pool.query(query, brand_id, function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/products/brands/editbrand', {
                brand: rows[0],
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
let postEditSlide = (req, res, next) => {
    productUploadFile(req, res, async (error) => {
        try {
            // Lấy tất cả sản phẩm và hiển thị ra table
            var arrayError = [],
                successArr = [];
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(300, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, async (err, info) => {
                        fs.unlinkSync(req.file.path);
                        if (req.body.brand_old_image) {
                            await fsExtras.remove(`${app.directory_brands}/${req.body.brand_old_image}`);
                        }
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            else if (req.body.brand_old_image) {
                filename = `${req.body.brand_old_image}`;
            }
            var queryUpdate = `
            UPDATE slide
            SET name = ?, 
            link = ?, 
            image = ?
            WHERE id = ?`
            var brandValues = [
                req.body.brand_name,
                req.body.brand_slug,
                filename,
                req.params.id
            ];
            await pool.query(queryUpdate, brandValues, function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.saveSuccess('thuộc tính'));
                req.flash('Success', successArr);
                res.redirect('/admin/brands');
            });
        } catch (error) {
            console.log(error);
        }
    })
}

// xóa dữ liệu của 1 brand
let postDeleteBrand = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];

        var brand_id = req.params.id;
        var query = `SELECT * FROM brand WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        var Image_delete = await service.queryActionBrandDelete(query, brand_id);

        var querydeleteBrand = `
        DELETE FROM 
        brand 
        WHERE id = ${brand_id}`

        pool.query(querydeleteBrand, async function (error, results, fields) {
            if (error) throw error;
            if (Image_delete != null || Image_delete != '') {
                await fsExtras.remove(`${app.directory_brands}/${Image_delete}`);
            }
            successArr.push(Transuccess.deleteSuccess('Thương hiệu'));
            req.flash('Success', successArr);
            res.redirect('/admin/brands');
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
    getAllSlide,
    addSlide
};