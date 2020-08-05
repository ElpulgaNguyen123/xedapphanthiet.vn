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
        cb(null, 'src/public/admin/uploads/brands');
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

var productUploadFile = multer({ storage: storage }).single('brand_image');

// get all products
let getAllBrand = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM `brand', function (error, rows, fields) {
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
        console.log(error);
        return res.status(500).send(error);
    }
}

// thêm hình ảnh cho thương hiệu
let addBrandImage = (req, res, next) => {
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
        var queryNewBrand = "INSERT INTO brand (name, slug, image) VALUES ?";
        var brandValues = [
            [req.body.brand_name,
            req.body.brand_slug,
                filename]
        ];
        var query = `
            SELECT * FROM brand WHERE brand.id = ?`;
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
let postEditBrand = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];
        var queryUpdate = `
        UPDATE brand
        SET name = ?, slug = ?, image = ?  
        WHERE id = ?;`
        var brandValues = [
            [
                req.body.brand_name,
                req.body.brand_slug,
                req.body.brand_image,
                req.params.id
            ]
        ];
        await pool.query(queryUpdate, brandValues, function (error, results, fields) {
            if (error) {
                arrayError.push('Có lỗi xảy ra ' + error);
                req.flash('errors', arrayError);
                res.redirect('/admin/brands');
            };
            successArr.push(Transuccess.saveSuccess('thuộc tính'));
            req.flash('Success', successArr);
            res.redirect('/admin/attribute/edit-attribute/' + req.params.id);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllBrand,
    addBrandImage,
    postEditBrand,
    getEditBrand
};