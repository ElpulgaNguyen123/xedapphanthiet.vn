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
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let FrBikeDetailController = async (req, res, next) => {
    try {
        const queryBlogDetail = 'SELECT * from blog WHERE id = ?';
        const queryFeature = `SELECT * FROM blog ORDER BY id DESC LIMIT 4`;
        //const queryBlog = `Select * from blog ${req.params.id}`;
        const blogFeature = await service.getAllBlog(queryFeature);
        console.log(blogFeature);
        const blog = await service.getBlog(queryBlogDetail, req.params.id);
        if (blog[0]) {
            //Lấy tất cả sản phẩm và hiển thị ra table
            res.render('xedapphanthiet/blogs/blog-detail', {
                title: 'Blog',
                blog: blog[0],
                blogFeature:blogFeature,
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