var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrhomeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table

        var slideQuery = 'SELECT * FROM slide';
        var brandQuery = 'SELECT * FROM brand';
        var productStreetQuery = `
        SELECT product.id, product.name, product.short_description, 
        product.image, 
        product.sku, 
        product.quantity,
        product.price,
        categories.category_name 
        FROM product 
        INNER JOIN categories ON product.category_id = categories.id 
        WHERE categories.id = 1`;
        var productRaceQuery = `SELECT product.id, product.name, product.short_description, 
        product.image, 
        product.sku, 
        product.quantity,
        product.price,
        categories.category_name 
        FROM product 
        INNER JOIN categories ON product.category_id = categories.id 
        WHERE categories.id = 2`;
        var productChildQuery = `SELECT product.id, product.name, product.short_description, 
        product.image, 
        product.sku, 
        product.quantity,
        product.price,
        categories.category_name 
        FROM product 
        INNER JOIN categories ON product.category_id = categories.id 
        WHERE categories.id = 3`;

        var queryBlog = 'Select * from blog';
        
        const slide = await service.getAllSlide(slideQuery);
        const brand = await service.getAllBrand(brandQuery);
        const streets = await service.getAllCategoryProduct(productStreetQuery);
        const racestype = await service.getAllCategoryProduct(productRaceQuery);
        const childstype = await service.getAllCategoryProduct(productChildQuery);
        const blogs = await service.getAllBlog(queryBlog);
        
        pool.query('SELECT * FROM `user', function (error, results, fields) {
            if (error) throw error;
            res.render('xedapphanthiet/home/home', {
                title: 'Trang chủ',
                slides : slide,
                brands : brand.slice(0, 8),
                streets : streets.slice(0,6),
                streetsTitle : streets[0],
                races : racestype.slice(0,6),
                childs : childstype.slice(0,6),
                blogs : blogs,
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