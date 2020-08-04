var pool = require('../../config/connectDb');
var app = require('../../config/app');
var service = require('../../../services');
var { Transuccess, saveSuccess, deleteSuccess } = require('../../../../lang/vi');


// get all products
let getAllBrand = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM `brand', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/products/brands/brands', {
                title: 'Thương hiệu',
                brands: rows,
                user: req.user
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
    getAllBrand,
};