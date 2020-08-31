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
        //const queryFeature = `SELECT * FROM blog ORDER BY id DESC LIMIT 10`;
        //const queryBlog = `Select * from blog ${req.params.id}`;
        //const blogFeature = await service.getAllBlog(queryFeature);
        //console.log(blogFeature);
        const bike = await service.getAllProductFr(getAllProductFr, req.params.id);
        console.log(bike);
        if (bike[0]) {
            //Lấy tất cả sản phẩm và hiển thị ra table
            res.render('xedapphanthiet/bikes/bike-detail', {
                title: 'Xe đạp',
                bike: bike[0],
                errors: req.flash('Errors'),
                success: req.flash('Success'),
            });
        }else {
            res.send('Lỗi không tìm thấy');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = {
    FrBikeController,
    FrBikeDetailController
};