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
            if (req.file) {
                // resize image before uploads.
                sharp(req.file.path).resize(300, 200).toBuffer(function (err, buffer) {
                    fs.writeFile(file.path, buffer, function (e) {
                    });
                });
            }
            req.flash('Success', successArr);
            res.redirect('/admin/brands');
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })
}

module.exports = {
    getAllBrand,
    addBrandImage,
};