var pool = require('../../../config/connectDb');
var app = require('../../../config/app');
var service = require('../../../../services');
var multer = require('multer');
var { uuid } = require('uuidv4');
var { Transuccess, saveSuccess, deleteSuccess } = require('../../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');

let getAllEndowFr = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM endow', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/website/endow/endow', {
                title: 'Ưu đãi',
                endows: rows,
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

module.exports = {
    getAllEndowFr
};