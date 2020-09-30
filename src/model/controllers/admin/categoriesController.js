var pool = require('../../config/connectDb');
var app = require('../../config/app');
var service = require('../../../services');
var multer = require('multer');
var { uuid } = require('uuidv4');
var { Transuccess } = require('../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, app.directory_categories);
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
        await pool.query('SELECT * FROM categories', function (error, rows, fields) {
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
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/categories');
    }
}
// thêm hình ảnh cho thương hiệu
let addCategory = (req, res, next) => {
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
            res.render('admin/notfound/notfound', {
                title: 'Trang Không tìm thấy'
            });
        }
    })
}

// lấy thông tin chỉnh sửa thương hiệu
let getEditCategory = async (req, res, next) => {
    try {
        var category_id = req.params.id;
        var query = `SELECT * FROM categories WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        await pool.query(query, category_id, function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/products/categories/editcategory', {
                category: rows[0],
                user: req.user,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
            });
        });
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/categories');
    }
}

// lấy thông tin chỉnh sửa thương hiệu gửi lên update lên server
let postEditCategory = (req, res, next) => {
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
                        if (req.body.category_old_image) {
                            await fsExtras.remove(`${app.directory_categories}/${req.body.category_old_image}`);
                        }
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            else if (req.body.category_old_image) {
                filename = `${req.body.category_old_image}`;
            }
            var queryUpdate = `
            UPDATE categories
            SET category_name = ?, 
            category_slug = ?, 
            image = ?
            WHERE id = ?`
            var categoryValues = [
                req.body.category_name,
                req.body.category_slug,
                filename,
                req.params.id
            ];
            await pool.query(queryUpdate, categoryValues, function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.saveSuccess('danh mục'));
                req.flash('Success', successArr);
                res.redirect('/admin/categories');
            });
        } catch (error) {
            arrayError.push('Có lỗi xảy ra');
            req.flash('errors', arrayError);
            res.redirect('/admin/categories');
        }
    })
}

// xóa dữ liệu của 1 brand
let DeleteCategory = async (req, res, next) => {
    try {
        var arrayError = [],
            successArr = [];

        var category_id = req.params.id;
        var querySetnull = `UPDATE product SET category_id = NULL WHERE category_id = ${category_id}`;
        var query = `SELECT * FROM categories WHERE id = ?`;
        var Image_delete = await service.queryActionCategoryDelete(query, category_id);
        if (Image_delete[0].image != null) {
            await fsExtras.remove(`${app.directory_categories}/${Image_delete[0].image}`);
        }
        await service.queryActionCategoriesNoParams(querySetnull);
        var querydeleteCategory = `
        DELETE FROM 
        categories 
        WHERE id = ${category_id}`;

        pool.query(querydeleteCategory, async function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.deleteSuccess('Danh mục'));
            req.flash('Success', successArr);
            res.redirect('/admin/categories');
        });

    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/categories');
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    getEditCategory,
    postEditCategory,
    DeleteCategory
};