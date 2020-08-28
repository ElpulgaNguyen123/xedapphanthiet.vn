var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrContactController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/contact/contact', {
            title: 'Liên hệ',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = FrContactController;