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
    getImageProduct,
    getAllCategoryProduct,
    getAllProductFr} = require('./productservice');

    var {queryActionBrandDelete,
        getAllBrand,
        queryActionBrandsParams,
        queryActionBrandsNoParams} = require('./brandService');
    var {queryActionSlideDelete,
    getAllSlide} = require('./slideService');
    var {queryActionBlogelete,
        getAllBlog,
        getBlog} = require('./blogService');
    var {queryActionCategoryDelete,
        queryActionCategoriesParams,
        queryActionCategoriesNoParams} = require('./categoryService');

        var {getAllEndow} = require('./endowService');
        var {getAllUser} = require('./userService');
        var {queryActionAttributeDelete} = require('./attributeService');


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
    getAllCategoryProduct,
    getAllProductFr,


    // brand service
    queryActionBrandDelete,
    getAllBrand,
    queryActionBrandsParams,
    queryActionBrandsNoParams,


    queryActionCategoryDelete,
    queryActionCategoriesParams,
    queryActionCategoriesNoParams,
    queryActionSlideDelete,
    getAllSlide,
    queryActionBlogelete,
    getAllBlog,
    getBlog,
    getAllEndow,
    getAllUser,
    queryActionAttributeDelete,

}