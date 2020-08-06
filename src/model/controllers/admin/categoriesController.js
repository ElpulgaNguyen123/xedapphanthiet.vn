var pool = require('../../config/connectDb');
var app = require('../../config/app');
var service = require('../../../services');
var multer = require('multer');
var { Transuccess, saveSuccess, deleteSuccess } = require('../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, 'src/public/uploads/categories');
    },
    filename: function (req, file, cb) {
        // let match = app.avatar_type;
        let match = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        //let fileName = `${file.fieldname}-${uuidv4()}-${Date.now()}-${file.originalname}`;
        cb(null, file.originalname);
    }
});
var productUploadFile = multer({ storage: storage }).single('category_image');

// get all products
let getAllCategories = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM `categories', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/products/categories/categories', {
                title: 'Danh mục',
                categories: rows,
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
let addCategory = (req, res, next) => {
    productUploadFile(req, res, (error) => {
        try {
            var arrayError = [],
                successArr = [];
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(300, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}.webp`, (err, info) => {
                        filename = `${req.file.filename}.webp`;
                        fs.unlinkSync(req.file.path);
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}.webp`;
            }
            var queryNewCategory = "INSERT INTO categories (category_name, category_slug, image) VALUES ?";
            var categoryValues = [
                [req.body.category_name,
                req.body.category_slug,
                    filename]
            ];
            pool.query(queryNewCategory, [categoryValues], function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.createSuccess('Danh mục'));
                req.flash('Success', successArr);
                res.redirect('/admin/categories');
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
        if (req.file) {
            // resize image before uploads.
            sharp(`${req.file.destination}/${req.file.filename}`)
                .resize(300, 200)
                .toFile(`${req.file.destination}/${req.file.filename}.webp`, (err, info) => {
                    filename = `${req.file.filename}.webp`;
                    fs.unlinkSync(req.file.path);
                });
        }
        var filename = '';
        if (req.file) {
            filename = `${req.file.filename}.webp`;
        }
        var query = `SELECT * FROM brand WHERE brand.id = ?`;
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
let postEditBrand = (req, res, next) => {
    productUploadFile(req, res, async (error) => {
        try {
            // Lấy tất cả sản phẩm và hiển thị ra table
            var arrayError = [],
                successArr = [];
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(300, 200)
                    .toFile(`${req.file.destination}/${req.file.filename}.webp`, (err, info) => {
                        filename = `${req.file.filename}.webp`;
                        fs.unlinkSync(req.file.path);
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}.webp`;
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
            await pool.query(queryUpdate, brandValues,  function (error, results, fields) {
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
        var querydeleteBrand = `
        DELETE FROM 
        brand 
        WHERE id = ${req.params.id}`
        pool.query(querydeleteBrand, function (error, results, fields) {
            if (error) throw error;
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
    getAllCategories,
    addCategory
};