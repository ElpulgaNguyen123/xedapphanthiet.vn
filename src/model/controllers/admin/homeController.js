var pool = require('../../config/connectDb');
var service = require('../../../services');

let homeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var user = req.user || {};
        var queyProduct = 'SELECT * FROM product';
        var queryBlog = 'SELECT * FROM blog';
        var products = [];
        var blogs = [];
        var productCount = 0;
        var blogCount = 0;
        var slideCount = 0;
        const allProducts = await service.queryActionNoParams(queyProduct);
        const allBlogs = await service.getAllBlog(queryBlog);
        const allSLide = await service.getAllSlide(queryBlog);

        if(allProducts){
            products = allProducts.slice(0,6);
            blogs = allBlogs.slice(0,6);
        }
        for(var x = 0; x < allProducts.length; x++){
            productCount++;
        }
        for(var x = 0; x < allBlogs.length; x++){
            blogCount++;
        }
        for(var x = 0; x < allSLide.length; x++){
            slideCount++;
        }
        res.render('admin/home/home', {
            title: 'Trang chủ',
            products : products,
            blogs : blogs,
            slideCount : slideCount,
            productCount : productCount,
            blogCount : blogCount,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: user
        })
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin');
    }
}
module.exports = homeController;