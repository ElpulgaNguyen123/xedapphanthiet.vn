
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
    editProductPost,
    searchData,
    getAllProductCategory,
    getAllProductBrand,
    getAllProductDesc } = require('./productController');

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


// website
var {
    getAllSlide,
    addSlide,
    getEditSlide,
    postEditSlide,
    postDeleteSlide
,} = require('./website/sliderController');

// website
var {
    getAllBlog,
    addBlogGet,
    addBlogPost,
    getEditBlog,
    postEditBlog,
    postDeleteBlog} = require('./website/blogController');


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
    getAllProductCategory,
    getAllProductBrand,
    getAllProductDesc,
    searchData,




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
    updateUserAvatar,


    // website / slide
    getAllSlide,
    addSlide,
    getEditSlide,
    postEditSlide,
    postDeleteSlide,


    // Blog
    getAllBlog,
    addBlogGet,
    addBlogPost,
    getEditBlog,
    postEditBlog,
    postDeleteBlog
}