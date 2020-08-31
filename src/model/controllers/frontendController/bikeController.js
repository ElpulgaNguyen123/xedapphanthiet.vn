var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');
const { response } = require('../../../../app');

let FrBikeController = async (req, res, next) => {
    try {
        const queryBikes = 'Select * from product';
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
        //Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bike-detail', {
            title: 'Xe đạp',
            bike: bike[0],
            blogFeature : blogFeature,
            images: images,
            relateBikes : relateBikes,
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