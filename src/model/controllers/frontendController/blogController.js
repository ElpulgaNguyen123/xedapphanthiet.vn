var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrBlogController = async (req, res, next) => {
    try {
        const queryBlog = 'Select * from blog';
        const blogs = await service.getAllBlog(queryBlog);
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/blogs/blogs', {
            title: 'Blog',
            blogs : blogs,
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
        var id = req.params.id;
        console.log(id);
        const queryBlog = `Select * from blog where id = ${id}`;
        const blog = await service.getBlog(queryBlog);
        console.log('Thông tin chi tiết bải viết !');
        console.log(blog);
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/blogs/blog-detail', {
            title: 'Blog',
            blog : blog,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = {
    FrBlogController,
    FrBlogDetailController
};