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
    getProductAttributes,
    getImageProduct} = require('./productservice');

    var {queryActionBrandDelete,
        getAllBrand} = require('./brandService');
    var {queryActionSlideDelete,
    getAllSlide} = require('./slideService');
    var {queryActionBlogelete} = require('./blogService');
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
    getImageProduct,


    // brand service
    queryActionBrandDelete,
    getAllBrand,
    queryActionCategoryDelete,
    queryActionSlideDelete,
    getAllSlide,
    queryActionBlogelete
}