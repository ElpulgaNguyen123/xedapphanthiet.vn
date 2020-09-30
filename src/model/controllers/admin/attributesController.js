var pool = require('../../config/connectDb');
var app = require('../../config/app');
var service = require('../../../services');
var { Transuccess, saveSuccess, deleteSuccess } = require('../../../../lang/vi');

// get all products start
let getAllAttribute = async (req, res, next) => {
    try {
        var query = `
        SELECT attributes.id, 
        attributes.attribute_name, 
        attributes.slug, 
        attribute_group.attribute_group_name
        FROM attributes 
        LEFT JOIN attribute_group 
        ON attributes.attribute_group_id=attribute_group.id`;

        // Lấy tất cả sản phẩm và hiển thị ra table
        pool.query(query, async function (error, results_01, fields) {
            if (error) throw error;
            var attributes = results_01 || [];
            await pool.query('SELECT * FROM attribute_group', async function (error, results_02, fields) {
                if (error) throw error;
                await pool.query('SELECT * FROM attribute_type', function (error, results_03, fields) {
                    if (error) throw error;
                    var attribute_types = [], attribute_groups = [];
                    attribute_groups = results_02 || [];
                    attribute_types = results_03 || [];
                    res.render('admin/products/attributes/attributes', {
                        title: 'Thuộc tính sản phẩm',
                        attributes: attributes,
                        attribute_types: attribute_types,
                        attribute_groups: attribute_groups,
                        user: req.user,
                        errors: req.flash('Errors'),
                        success: req.flash('Success'),
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.redirect('/attributes')
    }
}
// get all products end


// add more attribute products start
let postAddAttribute = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];
        var queryNewAttribute = "INSERT INTO attributes (attribute_name, slug, attribute_group_id, type) VALUES ?";
        var attributeValues = [
            [req.body.attribute_name,
            req.body.attribute_slug,
            req.body.attribute_group_id,
            req.body.attribute_type_id]
        ];
        pool.query(queryNewAttribute, [attributeValues], function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.createSuccess('thuộc tính'));
            req.flash('Success', successArr);
            res.redirect('/admin/attributes');
        });
    } catch (error) {
        console.log(error);
        return res.redirect('/attributes');
    }
}
// add more attribute products // end


// get more attribute products // start
let getEditAttribute = async (req, res, next) => {
    try {
        var id = req.params.id, title = '', attribute_name, slug;
        var queryType = 'SELECT * FROM attribute_type';
        var queryGroup = 'SELECT * FROM attribute_group';
        var attribute_types = await service.queryActionNoParams(queryType);
        var attribute_groups = await service.queryActionNoParams(queryGroup);
        await pool.query('SELECT * from attributes where id = ?', id, async function (error, results, fields) {
            if (error) throw error;
            var query = `
            SELECT 
            prd_attribute_value.name, 
            prd_attribute_value.id, 
            prd_attribute_value.slug, 
            attributes.attribute_name, 
            attributes.type 
            FROM prd_attribute_value 
            LEFT JOIN attributes 
            ON prd_attribute_value.attribute_id=attributes.id 
            WHERE attributes.id = ?`;
            // Lấy tất cả sản phẩm và hiển thị ra table
            await pool.query(query, id, function (error, results_02, fields) {
                if (error) throw error;
                var attribute_value = results_02 || [];
                res.render('admin/products/attributes/editattribute', {
                    attributes: results[0],
                    attribute_value: attribute_value,
                    attribute_types: attribute_types,
                    attribute_groups: attribute_groups,
                    user: req.user,
                    errors: req.flash('Errors'),
                    success: req.flash('Success'),
                });
            });
        });

    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/attribute');
    }
}
// get more attribute products // end


// add more attribute products method post // start
let postEditAttribute = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];
        var queryNewAttribute = "INSERT INTO attributes (name, slug, attribute_group_id, type) VALUES ?";
        var queryUpdate = `
        UPDATE attributes
        SET attribute_name = ?, slug = ?, attribute_group_id = ?, type = ?  
        WHERE id = ?;`
        var attributeValues = [
            req.body.attribute_name.toString(),
            req.body.attribute_slug.toString(),
            req.body.attribute_group_id,
            req.body.attribute_type_id,
            req.params.id
        ];
        await pool.query(queryUpdate, attributeValues, function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.saveSuccess('thuộc tính'));
            req.flash('Success', successArr);
            res.redirect('/admin/attribute/edit-attribute/' + req.params.id);
        });
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/attribute');
    }
}
// add more attribute products method post // end

// delete attribute products // start
let postDeleteAttribute = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];
        var id_attribute = req.params.id;

        var querydeleteAttributeVal = `
        DELETE FROM 
        prd_attribute_value 
        WHERE attribute_id = ${id_attribute}`;

        var querydeleteAttribute = `
        DELETE FROM 
        attributes 
        WHERE id = ${id_attribute}`;

        var deletes = await service.queryActionAttributeDelete(querydeleteAttributeVal);

        if (deletes) {
            await pool.query(querydeleteAttribute, function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.deleteSuccess('thuộc tính'));
                req.flash('Success', successArr);
                res.redirect('/admin/attributes');
            });
        } else {
            arrayError.push(Transuccess('Không xóa được thuộc tính !'));
            req.flash('errors', arrayError);
            res.redirect('/admin/attributes');
        }
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/attribute');
    }
}
// delete attribute products // end

// add more value attribute products // start
let postAddAttributeValue = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];
        var queryNewAttributeVal = `
        INSERT INTO 
        prd_attribute_value(attribute_id, name, slug)
        VALUES (${req.params.id}, 
            "${req.body.attribute_name_value}", 
            "${req.body.attribute_slug_value}")`;
        pool.query(queryNewAttributeVal, function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.createSuccess('thuộc tính'));
            req.flash('Success', successArr);
            res.redirect('/admin/attribute/edit-attribute/' + req.params.id);
        });
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/attribute');
    }
}
// add attribute value products // end

// delete attribute value products start
let postDeleteAttributeValue = async (req, res, next) => {
    try {
        var arrayError = [],
            successArr = [];
        var id_attribute = req.query.id_attribute;
        var querydeleteAttributeVal = `
        DELETE FROM 
        prd_attribute_value 
        WHERE id = ${req.params.id}`
        pool.query(querydeleteAttributeVal, function (error, results, fields) {
            if (error) throw error;
            successArr.push(Transuccess.deleteSuccess('thuộc tính'));
            req.flash('Success', successArr);
            res.redirect('/admin/attribute/edit-attribute/' + id_attribute);
        });
    } catch (error) {
        arrayError.push('Có lỗi xảy ra');
        req.flash('errors', arrayError);
        res.redirect('/admin/attribute');
    }
}
// delete attribute value products // end

module.exports = {
    postAddAttribute,
    getAllAttribute,
    getEditAttribute,
    postEditAttribute,
    postDeleteAttribute,
    postAddAttributeValue,
    postDeleteAttributeValue
};