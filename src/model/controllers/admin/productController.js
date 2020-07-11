var pool = require('../../config/connectDb');
var app = require('../../config/app');
var multer = require('multer');
var uuidv4 = require('uuid4');
const { json } = require('express');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, 'src/public/admin/uploads/products');
    },
    filename: function (req, file, cb) {
        // let match = app.avatar_type;
        let match = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        // let fileName = `${file.fieldname}-${uuidv4()}-${Date.now()}-${file.originalname}`;
        cb(null, file.originalname);
    }
});

var productUploadFile = multer({ storage: storage }).any('product-images', 10);

// get all products
let getAllProduct = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        pool.query('SELECT * FROM `product', function (error, results, fields) {

            if (error) throw error;
            var products = [];
            var object = {}

            for (index = 0; index < results.length; index++) {
                var images = JSON.parse(results[0].image);
                object = results[index];
                object.image = images;
                products.push(object);
            }

            res.render('admin/products/products', {
                title: 'Chỉnh sửa sản phẩm',
                products: products
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

// chuyển qua trang thêm sản phẩm   
let addProductGet = async (req, res, next) => {
    try {
        pool.query('SELECT * FROM `brand', function (error, results, fields) {
            res.render('admin/products/addproduct', {
                title: 'Thêm sản phẩm',
                brands : results
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

// add more product
let addProductPost = (req, res, next) => {

    let productItem = {};
    let successArr = [];

    productUploadFile(req, res, async (error) => {
        try {
            console.log(req.body);
            // var image = req.body.image_path.split(",");
            // productItem.image = image;
            // productItem.name = req.body.product_name;
            // productItem.price = req.body.product_price;
            // productItem.count = req.body.product_quantity;
            // productItem.brand = req.body.product_brand;
            // productItem.describes = req.body.propduct_describes;
            // productItem.status = true;
            // req.user._id được lưu ở session khi đăng nhập
            // let addProducts = await service.addProductService(productItem);
            // successArr.push(TranProductSuccess.createNewSuccess);
            // return res.redirect('/admin');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Lôi');
        }
    })
}

// Thêm hình ảnh sản phẩm
let addProductImage = (req, res, next) => {
    productUploadFile(req, res, (error) => {
        try {
            //thực hiện báo về cho protend;
            // req.files.map(async (file) => {
            //     // đường dẫn lưu ảnh
            //     try {
            //         await sharp(file.path).resize(290, 385).toBuffer(function (err, buffer) {
            //             fs.writeFile(file.path, buffer, function (e) {
            //             });
            //         });
            //     } catch (e) {
            //         console.error(e);
            //     }
            // })
            console.log(req.files);
            console.log('Danh sách tên file được upload lên')
            for (let index = 0; index < req.files.length; index++) {
                console.log(req.files[index].filename);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })
}

// edit product info Get
let editProductGet = async (req, res, next) => {
    let successArr = [];
    try {
        var query = `SELECT * FROM product where id= ${req.params.id}`;
        pool.query(query, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.render('admin/products/editProduct', {
                title: 'Chỉnh Sửa Sản Phẩm',
                product: results
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}



module.exports = {
    getAllProduct,
    addProductGet,
    addProductPost,
    editProductGet,
    addProductImage
};