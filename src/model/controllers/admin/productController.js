var pool = require('../../config/connectDb');
var app = require('../../config/app');
var multer = require('multer');
var { uuid } = require('uuid4');
var service = require('../../../services');
var { Transuccess } = require('../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, app.directory_products);
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

var productUploadFile = multer({ storage: storage }).any('product-images', 4);
var productUpdateFile = multer({ storage: storage }).single('product-image', 1);

// Lấy danh sách sản phẩm.
let getAllProduct = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        pool.query('SELECT * FROM `product', function (error, results, fields) {
            if (error) throw error;
            var page = parseInt(req.query.page) || 1; // n
            var perPage = 10; // x
            var start = (page - 1) * perPage;
            var end = page * perPage;
            var totalPage = Math.ceil(results.length / 10);
            var pageDistance = page + 3;
            res.render('admin/products/products', {
                title: 'Sản phẩm',
                products: results.slice(start, end),
                pages: pageDistance,
                page: page,
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
// chuyển qua trang thêm sản phẩm   
let addProductGet = async (req, res, next) => {
    try {
        var queryattributes = 'SELECT * FROM `attributes';
        var querycategories = 'SELECT * FROM `categories';
        var attributes = await service.queryActionNoParams(queryattributes);
        var categories = await service.queryActionNoParams(querycategories);
        pool.query('SELECT * FROM `brand', function (error, results, fields) {
            res.render('admin/products/addproduct', {
                title: 'Thêm sản phẩm',
                brands: results,
                attributes: attributes,
                categories: categories,
                user: req.user
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// thêm thuộc tính vào sản phẩm
let addProductAttribute = async (req, res, next) => {
    try {
        var result = {
            message: 'Thành công rồi !',
            attributes: [],
            type: '',
            attribute_id: '',
            attribute_name: '',
            id: req.body.id
        }
        var queryattributeValue = `
        SELECT prd_attribute_value.id, prd_attribute_value.name, attributes.id as attribute_id, attribute_name 
        FROM prd_attribute_value 
        LEFT JOIN attributes 
        ON prd_attribute_value.attribute_id=attributes.id 
        WHERE attributes.id = ?`;
        var queryAttributeType = `SELECT type FROM attributes WHERE attributes.id = ?`;
        var queryattribute = `SELECT * FROM attributes WHERE attributes.id = ?`;
        var attributeType = await service.queryAction(queryAttributeType, result.id);

        console.log('Loại thuộc tính');
        console.log(attributeType);
        

        if (attributeType[0].type == 2) {
            await pool.query(queryattributeValue, result.id, function (error, results, fields) {
                result.attributes = results;
                result.attribute_id = results[0].attribute_id;
                result.attribute_name = results[0].attribute_name;
                result.type = attributeType[0].type;
                console.log('Danh sách thuộc tính sản phẩm');
                console.log(result);
                return res.status(200).send(result);
            });
        } else {
            await pool.query(queryattribute, result.id, function (error, results, fields) {
                result.attributes = results;
                result.type = attributeType[0].type;
                result.attribute_id = results[0].id;
                result.attribute_name = results[0].attribute_name;
                return res.status(200).send(result);
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// add more product
let addProductPost = (req, res, next) => {
    let productItem = [];
    let successArr = [];
    productUploadFile(req, res, async (error) => {
        try {
            productItem[0] = req.body.product_sku;
            productItem[1] = req.body.product_brand;
            productItem[2] = req.body.product_category;
            productItem[3] = req.body.product_name;
            productItem[4] = req.body.product_slug;
            productItem[5] = req.body.product_price;
            productItem[6] = `${req.body.image_path}`;
            productItem[7] = req.body.propduct_description;
            productItem[8] = req.body.short_description;
            productItem[9] = req.body.product_meta_title;
            productItem[10] = req.body.product_meta_keyword;
            productItem[11] = req.body.product_meta_description;
            if (req.body.product_quantity <= 0) {
                productItem[12] = 0;
            }
            productItem[12] = 1;
            productItem[13] = req.body.product_quantity;

            var queryNewProduct = `
            INSERT INTO 
            product(
                sku, 
                brand_id,
                category_id,
                name,
                slug, 
                price, 
                image, 
                description, 
                short_description,
                meta_title,
                meta_keywords,
                meta_description,
                stock,
                quantity)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            // tạo mới sản phẩm
            await service.newProduct(queryNewProduct, productItem);
            // lấy được id sản phẩm vửa tạo.
            var id = await service.getlastProduct('SELECT MAX(ID) as id FROM product');
            // thêm vào chuỗi query;
            if (id[0].id) {
                // lấy danh sách thuộc tính sản phẩm và id.
                if (req.body.product_attributes_type02.length > 0) {
                    var gettype02Val = req.body.product_attributes_type02;
                    var attributes = gettype02Val.slice(0, -1);
                    var attributes_arr = attributes.split(",");
                    console.log(attributes_arr);
                    // thêm vào chuỗi query;
                    var valuestring = '';
                    for (var index = 0; index < attributes_arr.length; index++) {
                        valuestring += `(${id[0].id}, ${attributes_arr[index]}),`;
                    }
                    // xóa ký tự , cuối chuỗi.
                    var str = valuestring.slice(0, -1);
                    var queryType02 = `INSERT INTO prd_attribute(product_id, attribute_value_id) VALUES 
                    ${str}`;
                    await service.queryActionNoParamsreturn(queryType02);
                }
                if (req.body.product_attributes_type01.length > 0) {
                    var attributeType01 = JSON.parse(req.body.product_attributes_type01);

                    // lấy id cuối cùng dữ liệu thuộc tính vừa được khởi tạo.
                    var queryLastId = 'SELECT MAX(ID) as id FROM prd_attribute_value';
                    var lastId = await service.getLastId(queryLastId);
                    var lastIdRow = lastId[0].id;

                    // lấy danh sách dữ liệu thuộc tính mới cập nhật vào bảng product_attribute_value;
                    var valueStringValue = ''
                    for (var index = 0; index < attributeType01.length; index++) {
                        var newsattr = eval(`req.body.product_${attributeType01[index]}`);
                        valueStringValue += `(${attributeType01[index]}, '${newsattr}'),`;
                    }
                    // thêm dữ liệu thuộc tính mới vào bảng dữ liệu thuộc tính.
                    var str = valueStringValue.slice(0, -1);
                    var queryAddAtrrVal = `INSERT INTO prd_attribute_value(attribute_id, name) VALUES 
                    ${str}`;

                    await service.newAttributeVal(queryAddAtrrVal);
                    // lấy danh sách các id của dữ liệu thuộc tính vừa thêm vào
                    var lastsIdInsert = `SELECT id from prd_attribute_value where id > ${lastIdRow}`
                    var lastvalueIds = await service.getLastsId(lastsIdInsert);

                    // thêm dữ liệu vào cho sản Phẩm
                    var valueProduct = '';
                    for (var index = 0; index < attributeType01.length; index++) {
                        valueProduct += `(${id[0].id}, ${lastvalueIds[index].id}),`;
                    }
                    var strproductAdd = valueProduct.slice(0, -1);
                    var queryType01 = `INSERT INTO prd_attribute(product_id, attribute_value_id) VALUES 
                    ${strproductAdd}`;
                    await service.queryActionNoParamsreturn(queryType01);
                }
                successArr.push(Transuccess.createSuccess('sản phẩm'));
                req.flash('Success', successArr);
                return res.redirect('/admin/products');
            }
        } catch (error) {
            res.render('admin/notfound/notfound', {
                title: 'Trang Không tìm thấy'
            });
        }
    })
}

// Thêm hình ảnh sản phẩm
let addProductImage = (req, res, next) => {
    productUploadFile(req, res, (error) => {
        try {
            //thực hiện báo về cho protend;
            if (req.files) {
                req.files.map(async (file) => {
                    // đường dẫn lưu ảnh
                    try {
                        await sharp(file.path).resize(850, 850).toBuffer(function (err, buffer) {
                            fs.writeFile(file.path, buffer, function (e) {
                            });
                        });
                    } catch (e) {
                        console.error(e);
                    }
                });
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
        var product_id = req.params.id;
        var query = `SELECT * FROM product where id= ${product_id}`;
        var queryattributesValue = `SELECT prd_attribute_value.name, 
        attributes.attribute_name, prd_attribute_value.id, attributes.id as attribute_id ,attributes.attribute_name, attributes.type as type 
        FROM prd_attribute_value 
        INNER JOIN prd_attribute 
        ON prd_attribute.attribute_value_id = prd_attribute_value.id 
        INNER JOIN attributes ON prd_attribute_value.attribute_id = attributes.id
        WHERE prd_attribute.product_id = ${product_id}`;


        var queryProductAttributes = `SELECT DISTINCT attributes.id, 
        attributes.attribute_name, type 
        FROM prd_attribute_value 
        INNER JOIN prd_attribute ON prd_attribute.attribute_value_id = prd_attribute_value.id 
        INNER JOIN attributes ON prd_attribute_value.attribute_id = attributes.id 
        WHERE prd_attribute.product_id = ${product_id}`;


        var queryattributes = 'SELECT * FROM `attributes';
        var querycategories = 'SELECT * FROM `categories';
        var querybrands = 'SELECT * FROM brand';


        var attributesValue = await service.getProductAttributes(queryattributesValue);
        var productAttributes = await service.getProductAttributes(queryProductAttributes);
        var attributes = await service.queryActionNoParams(queryattributes);
        var categories = await service.queryActionNoParams(querycategories);
        var brands = await service.queryActionNoParams(querybrands);

        // lấy danh sách hình ảnh của sản phẩm.
        pool.query(query, function (error, rows, fields) {
            if (error) throw error;
            var images = '';
            var count = '';
            if (rows[0].image != '') {
                images = JSON.parse(rows[0].image);
                count = Object.keys(images).length;
            }
            res.render('admin/products/editProduct', {
                title: 'Chỉnh Sửa Sản Phẩm',
                product: rows[0],
                attributesValue: attributesValue,
                productAttributes: productAttributes,
                attributes: attributes,
                categories: categories,
                brands: brands,
                images: images,
                images_count: count,
                user: req.user
            });
        })
    } catch (error) {
        console.log(error);
        res.render('admin/notfound/notfound', {
            title: 'Trang Không tìm thấy'
        });
    }
}
// edit product post
let editProductPost = (req, res, next) => {
    let productItem = [];
    let successArr = [];
    productUploadFile(req, res, async (error) => {
        try {
            productItem[0] = req.body.product_sku;
            productItem[1] = req.body.product_brand;
            productItem[2] = req.body.product_category;
            productItem[3] = req.body.product_name;
            productItem[4] = req.body.product_slug;
            productItem[5] = req.body.product_price;
            productItem[6] = `${req.body.image_path}`;
            productItem[7] = req.body.propduct_description;
            productItem[8] = req.body.short_description;
            productItem[9] = req.body.product_meta_title;
            productItem[10] = req.body.product_meta_keyword;
            productItem[11] = req.body.product_meta_description;
            if (req.body.product_quantity <= 0) {
                productItem[12] = 0;
            }
            productItem[12] = 1;
            productItem[13] = req.body.product_quantity;

            console.log('Danh sách thông tin sản phẩm');
            console.log(productItem);

            console.log('Danh sách thuộc tính sản phẩm');
            console.log(req.body.product_attributes_type02);
            console.log(req.body.product_attributes_type01);

            var queryNewProduct = `
            INSERT INTO 
            product(
                sku, 
                brand_id,
                category_id,
                name,
                slug, 
                price, 
                image, 
                description, 
                short_description,
                meta_title,
                meta_keywords,
                meta_description,
                stock,
                quantity)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            // // tạo mới sản phẩm
            // await service.newProduct(queryNewProduct, productItem);
            // // lấy được id sản phẩm vửa tạo.
            // var id = await service.getlastProduct('SELECT MAX(ID) as id FROM product');
            // // thêm vào chuỗi query;
            // if (id[0].id) {
            //     // lấy danh sách thuộc tính sản phẩm và id.
            //     if (req.body.product_attributes_type02.length > 0) {
            //         var gettype02Val = req.body.product_attributes_type02;
            //         var attributes = gettype02Val.slice(0, -1);
            //         var attributes_arr = attributes.split(",");
            //         console.log(attributes_arr);
            //         // thêm vào chuỗi query;
            //         var valuestring = '';
            //         for (var index = 0; index < attributes_arr.length; index++) {
            //             valuestring += `(${id[0].id}, ${attributes_arr[index]}),`;
            //         }
            //         // xóa ký tự , cuối chuỗi.
            //         var str = valuestring.slice(0, -1);
            //         var queryType02 = `INSERT INTO prd_attribute(product_id, attribute_value_id) VALUES 
            //         ${str}`;
            //         await service.queryActionNoParamsreturn(queryType02);
            //     }
            //     if (req.body.product_attributes_type01.length > 0) {
            //         var attributeType01 = JSON.parse(req.body.product_attributes_type01);

            //         // lấy id cuối cùng dữ liệu thuộc tính vừa được khởi tạo.
            //         var queryLastId = 'SELECT MAX(ID) as id FROM prd_attribute_value';
            //         var lastId = await service.getLastId(queryLastId);
            //         var lastIdRow = lastId[0].id;

            //         // lấy danh sách dữ liệu thuộc tính mới cập nhật vào bảng product_attribute_value;
            //         var valueStringValue = ''
            //         for (var index = 0; index < attributeType01.length; index++) {
            //             var newsattr = eval(`req.body.product_${attributeType01[index]}`);
            //             valueStringValue += `(${attributeType01[index]}, '${newsattr}'),`;
            //         }
            //         // thêm dữ liệu thuộc tính mới vào bảng dữ liệu thuộc tính.
            //         var str = valueStringValue.slice(0, -1);
            //         var queryAddAtrrVal = `INSERT INTO prd_attribute_value(attribute_id, name) VALUES 
            //         ${str}`;

            //         await service.newAttributeVal(queryAddAtrrVal);
            //         // lấy danh sách các id của dữ liệu thuộc tính vừa thêm vào
            //         var lastsIdInsert = `SELECT id from prd_attribute_value where id > ${lastIdRow}`
            //         var lastvalueIds = await service.getLastsId(lastsIdInsert);

            //         // thêm dữ liệu vào cho sản Phẩm
            //         var valueProduct = '';
            //         for (var index = 0; index < attributeType01.length; index++) {
            //             valueProduct += `(${id[0].id}, ${lastvalueIds[index].id}),`;
            //         }
            //         var strproductAdd = valueProduct.slice(0, -1);
            //         var queryType01 = `INSERT INTO prd_attribute(product_id, attribute_value_id) VALUES 
            //         ${strproductAdd}`;
            //         await service.queryActionNoParamsreturn(queryType01);
            //     }
            //     successArr.push(Transuccess.createSuccess('sản phẩm'));
            //     req.flash('Success', successArr);
            //     return res.redirect('/admin/products');
            // }
        } catch (error) {
            res.render('admin/notfound/notfound', {
                title: 'Trang Không tìm thấy'
            });
        }
    })
}

//  lấy hình ảnh được sửa update để gửi xuống cho client
let editProductImage = (req, res, next) => {
    productUpdateFile(req, res, async (error) => {
        try {
            var product_id = req.params.id;
            var image_index = req.query.index;
            var query = `SELECT image from product WHERE id = ${product_id}`
            var imageLink = await service.getImageProduct(query);
            console.log(imageLink);
            var Obj = JSON.parse(imageLink[0].image);
            var result = {
                id: req.params.id,
                index: req.query.index,
                imageName: Obj[image_index],
            }
            return res.status(200).send(result);

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        // Everything went fine.
    })
}

// thực hiện update hình ảnh đã được chọn lên server
let updateProductImagePost = (req, res, next) => {
    productUpdateFile(req, res, async (error) => {
        try {
            if (req.file) {
                var product_id = req.params.id;
                var index = req.query.index;
                await sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(850, 850)
                    .toFile(`${req.file.destination}/${Date.now()}-${req.file.filename}`, (err, info) => {
                        fs.unlinkSync(req.file.path);
                    });
                var filename = '';
                if (req.file) {
                    filename = `${Date.now()}-${req.file.filename}`;
                }
                var query = `SELECT image from product WHERE id = ${product_id}`
                var imageLink = await service.getImageProduct(query);
                // lấy da được object.
                var Obj = JSON.parse(imageLink[0].image);
                var old_image = Obj[index];
                Obj[index] = filename;
                Obj = JSON.stringify(Obj);
                await fsExtras.remove(`${app.directory_products}/${old_image}`);
                var ProductValues = [
                    Obj,
                    product_id
                ];
                var queryUpdateImage = `
                UPDATE product
                SET image = ? 
                WHERE id = ?`
                await pool.query(queryUpdateImage, ProductValues, function (error, results, fields) {
                    if (error) throw error;
                    let result = {
                        message: Transuccess.product_updated,
                        imageSrc: filename,
                        idImage : `image_${product_id}_${index}`
                    }
                    return res.status(200).send(result);
                });
            } else {
                console.log('không có kết quả !');
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        // Everything went fine.
    });
}

// Xóa cụ thể hình ảnh sản phẩm
let deleteProductImage = async (req, res, next) => {
    let successArr = [];
    try {
        var product_id = req.params.id;
        var index = req.query.index;
        var query = `SELECT image from product WHERE id = ${product_id}`
        var imageLink = await service.getImageProduct(query);

        var Obj = JSON.parse(imageLink[0].image);
        var old_image = Obj[index];
        console.log(Obj);
        delete Obj[`${index}`];
        await fsExtras.remove(`${app.directory_products}/${old_image}`);
        Obj = JSON.stringify(Obj);
        var ProductValues = [
            Obj,
            product_id
        ];
        var queryUpdateImage = `
        UPDATE product
        SET image = ? 
        WHERE id = ?`;
        await pool.query(queryUpdateImage, ProductValues, function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.deleteSuccess('Xóa hình ảnh thành công !'));
            req.flash('Success', successArr);
            return res.redirect('/admin/product/edit-product/' + product_id);
        });

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
    addProductImage,
    addProductAttribute,
    editProductImage,
    updateProductImagePost,
    deleteProductImage,
    editProductPost
};