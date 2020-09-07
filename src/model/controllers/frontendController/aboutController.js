var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrAboutController = async (req, res, next) => {
    try {

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/about/about', {
            title: 'Giới thiệu',
            userInfo : userInfo,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = FrAboutController;