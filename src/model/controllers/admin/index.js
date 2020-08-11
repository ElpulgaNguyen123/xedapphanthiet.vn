
// Admin controller start
var homeController = require('./homeController');
var { getAllProduct,
    addProductGet,
    addProductPost,
    editProductGet,
    addProductImage,
    addProductAttribute,
    editProductImage,
    updateProductImagePost,
    deleteProductImage,
    editProductPost } = require('./productController');

var {getAllAttribute, 
    postAddAttribute,
    getEditAttribute,
    postEditAttribute,
    postDeleteAttribute,
    postAddAttributeValue,
    postDeleteAttributeValue} = require('./attributesController');

var {getAllBrand,
    addBrandImage,
    postEditBrand,
    getEditBrand,
    postDeleteBrand} = require('./brandController');

    var {getAllCategories,
        addCategory,
        getEditCategory,
        postEditCategory,
        postDeleteCategory}= require('./categoriesController');

var { loginController,
    registerController,
    PostRegisterController,
    resetPasswordController,
    PostResetPasswordController,
    resetPasswordGetToken,
    changePasswordController,
    changePassword,

    checkloggedOut,
    checkloggedIn,
    getLogout
} = require('./authController');


var {
    getUser,
    updateUserData,
    updateUserAvatar
} = require('./userController');



module.exports = {

    // Admin START
    homeController,
    // products
    getAllProduct,
    addProductGet,
    addProductPost,
    editProductGet,
    addProductImage,
    addProductAttribute,
    editProductImage,
    updateProductImagePost,
    deleteProductImage,
    editProductPost,


    // attributes
    getAllAttribute,
    postAddAttribute,
    getEditAttribute,
    postEditAttribute,
    postDeleteAttribute,
    postAddAttributeValue,
    postDeleteAttributeValue,
    postDeleteCategory,
    

    // Brands
    getAllBrand,
    addBrandImage,
    postEditBrand,
    getEditBrand,
    postDeleteBrand,

    // Categories
    getAllCategories,
    addCategory,
    getEditCategory,
    postEditCategory,


    // authencation
    loginController,
    registerController,
    PostRegisterController,
    resetPasswordController,
    PostResetPasswordController,
    resetPasswordGetToken,
    changePasswordController,
    changePassword,


    checkloggedOut,
    checkloggedIn,
    getLogout,


    // user
    getUser,
    updateUserData,
    updateUserAvatar
}