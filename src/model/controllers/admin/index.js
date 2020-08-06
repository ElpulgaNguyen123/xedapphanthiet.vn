
// Admin controller start
var homeController = require('./homeController');
var { getAllProduct,
    addProductGet,
    addProductPost,
    editProductGet,
    addProductImage,
    addProductAttribute } = require('./productController');

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
        addCategory }= require('./categoriesController');

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


    // attributes
    getAllAttribute,
    postAddAttribute,
    getEditAttribute,
    postEditAttribute,
    postDeleteAttribute,
    postAddAttributeValue,
    postDeleteAttributeValue,
    

    // Brands
    getAllBrand,
    addBrandImage,
    postEditBrand,
    getEditBrand,
    postDeleteBrand,

    // Categories
    getAllCategories,
    addCategory,


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