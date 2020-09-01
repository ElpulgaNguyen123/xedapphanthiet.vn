var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');
const { response } = require('../../../../app');

let FrBikeController = async (req, res, next) => {
    try {
        const queryBikes = 'Select * from product';
        var queryattributes = 'SELECT * FROM `attributes';
        var querycategories = 'SELECT * FROM `categories';
        var querybrands = 'SELECT * FROM brand';

        const bikes = await service.getAllProductFr(queryBikes);
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bikes', {
            title: 'Bikes',
            bikes: bikes,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
let FrBikeDetailController = async (req, res, next) => {
    try {
        const getAllProductFr = 'SELECT * from product WHERE id = ?';
        const queryFeature = `SELECT * FROM blog ORDER BY id DESC LIMIT 10`;
        const queryBikeRelate = `SELECT * FROM product WHERE product.category_id = ? ORDER BY id DESC LIMIT 8        `
        const blogFeature = await service.getAllBlog(queryFeature);
        const bike = await service.getAllProductFr(getAllProductFr, req.params.id);
        const relateBikes = await service.getAllProductFr(queryBikeRelate, bike[0].category_id);
        var images = '';
        var imagesArr = [];
        console.log(bike[0].image);
        if (bike[0]) {
            images = JSON.parse(bike[0].image);
            imagesArr = Object.keys(images);
        }


        var queryProductAttributes = `SELECT DISTINCT attributes.id, 
        attributes.attribute_name, type 
        FROM prd_attribute_value 
        INNER JOIN prd_attribute ON prd_attribute.attribute_value_id = prd_attribute_value.id 
        INNER JOIN attributes ON prd_attribute_value.attribute_id = attributes.id 
        WHERE prd_attribute.product_id = ${req.params.id}`;
        // lấy ra danh sách thuộc tính và id thuộc tính có trong sản phẩm.
        var productAttributes = await service.getProductAttributes(queryProductAttributes);

        var queryattributeValue = `
        SELECT prd_attribute_value.id, 
        prd_attribute_value.name, 
        attributes.id as attribute_id, attribute_name 
        FROM prd_attribute_value 
        LEFT JOIN attributes 
        ON prd_attribute_value.attribute_id=attributes.id 
        WHERE attributes.id = ?`;
        var idtype02 = [];
        var idtype01 = [];
        for (var i = 0; i < productAttributes.length; i++) {
            if (productAttributes[i].type == 2) {
                idtype02.push(productAttributes[i].id);
            } else if (productAttributes[i].type == 1) {
                idtype01.push(productAttributes[i].id);
            }
        }
        // danh sách thuộc tính loại 2 của sản phẩm
        var attributeValueArr = [];
        for (var i = 0; i < idtype02.length; i++) {
            var x = await service.queryAction(queryattributeValue, idtype02[i]);
            attributeValueArr.push(x);
        }
        console.log(attributeValueArr);

        //Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bike-detail', {
            title: 'Xe đạp',
            bike: bike[0],
            blogFeature: blogFeature,
            images: images,
            relateBikes: relateBikes,
            imagearr: imagesArr,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = {
    FrBikeController,
    FrBikeDetailController
};