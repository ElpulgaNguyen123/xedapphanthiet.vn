var pool = require('../../config/connectDb');
const { query } = require('express');
const service = require('../../../services');

let FrhomeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table

        let streets = [];
        let racestype = []; 
        let childstype = [];
        
        var slideQuery = 'SELECT * FROM slide';
        var brandQuery = 'SELECT * FROM brand';
        var queryCategory = 'SELECT * FROM categories';
        var queryEndow = 'SELECT * FROM endow';

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }
        const categories = await service.getAllCategoryProduct(queryCategory);

        var productStreetQuery = '';
        var productRaceQuery = '';
        var productChildQuery = '';

        if(categories[0].id){
            productStreetQuery = `
            SELECT product.id as product_id, product.name, product.short_description, 
            product.image, 
            product.sku,
            product.slug, 
            product.quantity,
            product.price,
            categories.category_name,
            categories.category_name,
            categories.category_slug,
            categories.id  
            FROM product 
            INNER JOIN categories ON product.category_id = categories.id 
            WHERE categories.id = ${categories[0].id}`;
            streets = await service.getAllCategoryProduct(productStreetQuery);
        }
        if(categories[1].id){
            productRaceQuery = `SELECT product.id as product_id, product.name, product.short_description, 
            product.image, 
            product.sku,
            product.slug, 
            product.quantity,
            product.price,
            categories.category_name,
            categories.category_slug,
            categories.id 
            FROM product 
            INNER JOIN categories ON product.category_id = categories.id 
            WHERE categories.id = ${categories[1].id}`;
            racestype = await service.getAllCategoryProduct(productRaceQuery);
        }
        if(categories[2].id){
            productChildQuery = `SELECT product.id as product_id, product.name, product.short_description, 
            product.image, 
            product.sku,
            product.slug, 
            product.quantity,
            product.price,
            categories.category_name,
            categories.category_slug,
            categories.id  
            FROM product 
            INNER JOIN categories ON product.category_id = categories.id 
            WHERE categories.id = ${categories[2].id}`;
            childstype = await service.getAllCategoryProduct(productChildQuery);
        }


        var queryBlog = 'Select * from blog';
        const slide = await service.getAllSlide(slideQuery);
        const brand = await service.getAllBrand(brandQuery);
        const endows = await service.getAllEndow(queryEndow);
        const blogs = await service.getAllBlog(queryBlog);

        pool.query('SELECT * FROM user', function (error, results, fields) {
            if (error) throw error;
            res.render('xedapphanthiet/home/home', {
                title: 'Trang chủ',
                slides: slide,
                endows : endows,
                brands: brand.slice(0, 8),
                streets: streets.slice(0, 6),
                streetsTitle: streets[0],
                raceTitle: racestype[0],
                childTitle: childstype[0],
                races: racestype.slice(0, 6),
                childs: childstype.slice(0, 6),
                blogs: blogs,
                userInfo : userInfo,
                errors: req.flash('Errors'),
                success: req.flash('Success')
            })
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = FrhomeController;