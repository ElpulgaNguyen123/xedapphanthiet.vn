var pool = require('../../config/connectDb');
var app = require('../../config/app');
var service = require('../../../services');
var multer = require('multer');
var { uuid } = require('uuidv4');
var { Transuccess} = require('../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, app.directory_brands);
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
var productUploadFile = multer({ storage: storage }).single('brand_image');
// get all products
let getAllBrand = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM brand', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/products/brands/brands', {
                title: 'Thương hiệu',
                brands: rows,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: req.user
            });
        });

    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/brands');
    }
}

// thêm hình ảnh cho thương hiệu
let addBrandImage = (req, res, next) => {
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
            var queryNewBrand = "INSERT INTO brand (name, slug, image) VALUES ?";
            var brandValues = [
                [req.body.brand_name,
                req.body.brand_slug,
                    filename]
            ];
            pool.query(queryNewBrand, [brandValues], function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.createSuccess('Thương hiệu'));
                req.flash('Success', successArr);
                res.redirect('/admin/brands');
            });
        } catch (error) {
            arrayError.push('Có lỗi xảy ra');
            req.flash('errors', arrayError);
            res.redirect('/admin/brands');
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
        arrayError.push('Có lỗi xảy ra');
            req.flash('errors', arrayError);
            res.redirect('/admin/brands');
    }
}
// lấy thông tin chỉnh sửa thương hiệu gửi lên update lên server
let postEditBrand = (req, res, next) => {
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
            UPDATE brand
            SET name = ?, 
            slug = ?, 
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
            arrayError.push('Có lỗi xảy ra');
            req.flash('errors', arrayError);
            res.redirect('/admin/brands');
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
        var querySetnull = `UPDATE product SET brand_id = NULL WHERE brand_id = ${brand_id}`;
        var query = `SELECT * FROM brand WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        var Image_delete = await service.queryActionBrandDelete(query, brand_id);
        if (Image_delete[0].image != null) {
            await fsExtras.remove(`${app.directory_brands}/${Image_delete[0].image}`);
        }
        await service.queryActionBrandsNoParams(querySetnull);

        var querydeleteBrand = `
        DELETE FROM 
        brand 
        WHERE id = ${brand_id}`
        pool.query(querydeleteBrand, async function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.deleteSuccess('Thương hiệu'));
            req.flash('Success', successArr);
            res.redirect('/admin/brands');
        });

    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/brands');
    }
}

module.exports = {
    getAllBrand,
    addBrandImage,
    postEditBrand,
    getEditBrand,
    postDeleteBrand
};