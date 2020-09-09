var pool = require('../../config/connectDb');
const service = require('../../../services');

let FrBikeController = async (req, res, next) => {

    try {

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }

        const queryBikes = 'Select * from product';
        const querycategories = 'SELECT * FROM `categories';
        const querybrands = 'SELECT * FROM brand';
        const brands = await service.getAllBrand(querybrands);
        const categories = await service.getAllCategoryProduct(querycategories);
        const bikes = await service.getAllProductFr(queryBikes);
        // Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bikes', {
            title: 'Xe đạp',
            userInfo : userInfo,
            bikes: bikes,
            brands: brands,
            categories: categories,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}


let getAllBikeCategory = async (req, res, next) => {
    try {

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }
        // Lấy tất cả sản phẩm và hiển thị ra table
        const querycategories = 'SELECT * FROM categories';
        const querybrands = 'SELECT * FROM brand';
        const queryBike = `SELECT * FROM product WHERE category_id = ?`;
        const brands = await service.getAllBrand(querybrands);
        const categories = await service.getAllCategoryProduct(querycategories);

        pool.query(queryBike, req.params.iddanhmuc, async function (error, results, fields) {
            if (error) throw error;

            const queryTittle = `SELECT * FROM categories WHERE id = ?`;
            const categoriesTitle = await service.queryActionCategoriesParams(queryTittle, req.params.iddanhmuc);
            if (categoriesTitle.length > 0) {
                title = categoriesTitle[0].category_name;
            }
            res.render('xedapphanthiet/bikes/bikes', {
                title: title,
                userInfo : userInfo,
                bikes: results,
                brands: brands,
                categories: categories,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: req.user
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let getAllBikeBrand = async (req, res, next) => {
    try {

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }
        // Lấy tất cả sản phẩm và hiển thị ra table
        const querycategories = 'SELECT * FROM categories';
        const querybrands = 'SELECT * FROM brand';
        const queryBike = `SELECT * FROM product WHERE brand_id = ?`;
        const brands = await service.getAllBrand(querybrands);
        const categories = await service.getAllCategoryProduct(querycategories);
        pool.query(queryBike, req.params.idthuonghieu, async function (error, results, fields) {
            if (error) throw error;

            const queryTittle = `SELECT * FROM brand WHERE id = ?`;
            const brandsTitle = await service.queryActionBrandsParams(queryTittle, req.params.idthuonghieu);
            if (brandsTitle.length > 0) {
                title = brandsTitle[0].name;
            }

            res.render('xedapphanthiet/bikes/bikes', {
                title: title,
                userInfo : userInfo,
                bikes: results,
                brands: brands,
                categories: categories,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: req.user
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let getAllBikeDesc = async (req, res, next) => {
    try {

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }
        // Lấy tất cả sản phẩm và hiển thị ra table
        const queryBrands = 'SELECT * FROM brand';
        const queryCategories = 'SELECT * FROM categories';
        const brands = await service.getAllBrand(queryBrands);
        const categories = await service.getAllCategoryProduct(queryCategories);

        pool.query(`SELECT * FROM product ORDER BY id DESC`, function (error, results, fields) {
            if (error) throw error;
            var page = parseInt(req.query.page) || 1; // n
            var perPage = 10; // x
            var start = (page - 1) * perPage;
            var end = page * perPage;
            var totalPage = Math.ceil(results.length / 10);
            var pageDistance = page + 3;
            res.render('admin/products/products', {
                title: 'Sản phẩm',
                userInfo : userInfo,
                products: results.slice(start, end),
                pages: pageDistance,
                page: page,
                brands: brands,
                categories: categories,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: req.user
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let FrBikeDetailController = async (req, res, next) => {
    try {

        let userInfo = {};
        var queryUser = 'SELECT * FROM user';
        var user = await service.getAllUser(queryUser);
        if(user[0]){
            userInfo = user[0];
        }

        const getAllProductFrs = 'SELECT * from product WHERE id = ?';
        const queryFeature = `SELECT * FROM blog ORDER BY id DESC LIMIT 10`;
        const queryBikeRelate = `SELECT * FROM product WHERE product.category_id = ? ORDER BY id DESC LIMIT 8        `
        const blogFeature = await service.getAllBlog(queryFeature);
        console.log(req.params.id);
        const bike = await service.getAllProductFr(getAllProductFrs, req.params.id);
        let relateBikes = [];
        if (bike[0].category_id) {
            relateBikes = await service.getAllProductFr(queryBikeRelate, bike[0].category_id);
        }
        var images = '';
        var imagesArr = [];
        console.log(bike[0].image);
        if (bike[0]) {
            images = JSON.parse(bike[0].image);
            imagesArr = Object.keys(images);
        }
        var queryAllAttribute = `
        SELECT prd_attribute_value.name, 
        attributes.attribute_name,
        attributes.type
        FROM prd_attribute_value 
        INNER JOIN prd_attribute 
        ON prd_attribute_value.id = prd_attribute.attribute_value_id 
        INNER JOIN attributes ON prd_attribute_value.attribute_id = attributes.id 
        WHERE prd_attribute.product_id = ?`;

        const bikeAttribute = await service.getAllProductFr(queryAllAttribute, bike[0].id);
        const idtype02Arrs = [];
        const idtype01Arrs = [];

        for (var i = 0; i < bikeAttribute.length; i++) {
            if (bikeAttribute[i].type == 2) {
                idtype02Arrs.push(bikeAttribute[i]);
            } else if (bikeAttribute[i].type == 1) {
                idtype01Arrs.push(bikeAttribute[i]);
            }
        }
        //Lấy tất cả sản phẩm và hiển thị ra table
        res.render('xedapphanthiet/bikes/bike-detail', {
            title: 'Xe đạp',
            bike: bike[0],
            userInfo : userInfo,
            blogFeature: blogFeature,
            images: images,
            idtype01Arrs: idtype01Arrs,
            idtype02Arrs: idtype02Arrs,
            relateBikes: relateBikes,
            imagearr: imagesArr,
            errors: req.flash('Errors'),
            success: req.flash('Success'),
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

let searchData = async (req, res, next) => {
    let successArr = [];
    try {
        var product_sku = req.params.sku;
        var queryBike = `
        SELECT * FROM product WHERE sku LIKE 
        '%${product_sku}%' 
        ORDER BY ID DESC LIMIT 6`;
        var result = {};
        await pool.query(queryBike, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            result.results = results;
            return res.status(200).send(result);
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

module.exports = {
    FrBikeController,
    FrBikeDetailController,
    getAllBikeCategory,
    getAllBikeBrand,
    searchData
};