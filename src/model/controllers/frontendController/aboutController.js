var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrAboutController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/about/about', {
            title: 'Giới thiệu',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = FrAboutController;