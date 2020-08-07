var { register_service,
    resetpassword_service,
    resetPassword, } = require('./authService');

var { queryAction, 
    queryActionNoParams, 
    newProduct,
    getlastProduct,
    getLastId,
    newAttributeVal,
    getLastsId,
    queryActionNoParamsreturn,
    getProductAttributes} = require('./productservice');

    var {queryActionBrandDelete} = require('./brandService');
    var {queryActionCategoryDelete} = require('./categoryService');

module.exports = {
    register_service,
    resetpassword_service,
    resetPassword,


    // product service
    queryAction,
    queryActionNoParams,
    newProduct,
    getlastProduct,
    getLastId,
    newAttributeVal,
    getLastsId,
    queryActionNoParamsreturn,
    getProductAttributes,


    // brand service
    queryActionBrandDelete,
    queryActionCategoryDelete
}