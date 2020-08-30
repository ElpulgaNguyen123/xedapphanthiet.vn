var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');
const { response } = require('../../../../app');

let FrBlogController = async (req, res, next) => {
    try {
        const queryBlog = 'Select * from blog';
        const blogs = await service.getAllBlog(queryBlog);
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/blogs/blogs', {
            title: 'Blog',
            blogs: blogs,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let FrBlogDetailController = async (req, res, next) => {
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
    FrBlogController,
    FrBlogDetailController
};