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
        const brands = await service.getAllBrand(querybrands);
        const bikes = await service.getAllProductFr(queryBikes);
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bikes', {
            title: 'Bikes',
            bikes: bikes,
            brands:brands,
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
        var queryAllAttribute = `
        SELECT prd_attribute_value.name, 
        attributes.attribute_name,
        attributes.type
        FROM prd_attribute_value 
        INNER JOIN prd_attribute 
        ON prd_attribute_value.id = prd_attribute.attribute_value_id 
        INNER JOIN attributes ON prd_attribute_value.attribute_id = attributes.id 
        WHERE prd_attribute.product_id = ?`;

        const bikeAttribute = await service.getAllProductFr(queryAllAttribute, bike[0].id);
        const idtype02Arrs = [];
        const idtype01Arrs = [];

        for (var i = 0; i < bikeAttribute.length; i++) {
            if (bikeAttribute[i].type == 2) {
                idtype02Arrs.push(bikeAttribute[i]);
            } else if (bikeAttribute[i].type == 1) {
                idtype01Arrs.push(bikeAttribute[i]);
            }
        }

        //Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bike-detail', {
            title: 'Xe đạp',
            bike: bike[0],
            blogFeature: blogFeature,
            images: images,
            idtype01Arrs : idtype01Arrs,
            idtype02Arrs : idtype02Arrs,
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