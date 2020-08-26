var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrhomeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table

        var slideQuery = 'SELECT * FROM slide';
        var brandQuery = 'SELECT * FROM brand';
        var productStreetQuery = 'SELECT * FROM `product` WHERE category_id = 1';

        const slide = await service.getAllSlide(slideQuery);
        const brand = await service.getAllBrand(brandQuery);
        const streets = await service.getAllCategoryProduct(productStreetQuery);

        pool.query('SELECT * FROM `user', function (error, results, fields) {
            if (error) throw error;
            res.render('xedapphanthiet/home/home', {
                title: 'Trang chủ',
                slides : slide,
                brands : brand.slice(0, 8),
                streets : streets.slice(0,6),
                errors: req.flash('Errors'),
                success: req.flash('Success'),
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = FrhomeController;