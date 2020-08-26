var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrhomeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table

        var slideQuery = 'SELECT * FROM slide';
        var brandQuery = 'SELECT * FROM brand';

        const slide = await service.getAllSlide(slideQuery);
        const brand = await service.getAllBrand(brandQuery);

        pool.query('SELECT * FROM `user', function (error, results, fields) {
            if (error) throw error;
            res.render('xedapphanthiet/home/home', {
                title: 'Trang chủ',
                slides : slide,
                brands : brand,
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