var express = require('express');
var adminRouter = express.Router();
var { validateRegister, validateEmailResetpassword, validateChangePassword } = require('../validator');
var controller = require('../model/controllers/admin');
var passport = require('passport');
var { initPassportLocal } = require('../model/controllers/admin/passportController');

initPassportLocal();
// authencation ===============
adminRouter.get('/login', controller.checkloggedOut, controller.loginController);
adminRouter.post('/login', controller.checkloggedOut, passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: 'Người dùng không tồn tại !',
  successFlash: 'Chào mừng !',
}));

// authencation =============
adminRouter.get('/logout', controller.checkloggedIn, controller.getLogout);
adminRouter.get('/register', controller.registerController);
adminRouter.post('/register', controller.checkloggedOut,validateRegister, controller.PostRegisterController);
adminRouter.get('/reset-password',controller.checkloggedOut, controller.resetPasswordController);
adminRouter.post('/reset-password',controller.checkloggedOut, validateEmailResetpassword, controller.PostResetPasswordController);
adminRouter.get('/reset-password/:token', controller.checkloggedOut, controller.resetPasswordGetToken);
adminRouter.get('/change-password/:token',controller.checkloggedOut, controller.changePasswordController);
adminRouter.post('/change-password/:token',controller.checkloggedOut, validateChangePassword, controller.changePassword)
// authencation / end =============

// userupdate data ===========
adminRouter.get('/user/:id', controller.checkloggedIn, controller.getUser);
adminRouter.post('/update-user/:id', controller.checkloggedIn, controller.updateUserData);
adminRouter.post('/update-avatar/:id', controller.checkloggedIn, controller.updateUserAvatar);
// userupdate data ===========

adminRouter.get('/', controller.checkloggedIn, controller.homeController);
// products router
adminRouter.get('/products', controller.checkloggedIn, controller.getAllProduct);
adminRouter.get('/products/add-product', controller.checkloggedIn, controller.checkloggedIn, controller.addProductGet);
adminRouter.post('/product/add-product-image', controller.checkloggedIn, controller.addProductImage);
adminRouter.post('/products/add-product', controller.checkloggedIn, controller.addProductPost);
adminRouter.get('/product/edit-product/:id', controller.checkloggedIn, controller.editProductGet);
adminRouter.post('/product/edit-product/:id', controller.checkloggedIn, controller.editProductPost);
adminRouter.post('/product/add-product-attribute/:id', controller.checkloggedIn, controller.addProductAttribute);
adminRouter.get('/product/edit-product-image/:id', controller.checkloggedIn, controller.editProductImage);
adminRouter.post('/product/edit-product-image/:id', controller.checkloggedIn, controller.updateProductImagePost);
adminRouter.get('/product/delete-product-image/:id', controller.checkloggedIn, controller.deleteProductImage);
// products router end

// attribute start
adminRouter.get('/attributes', controller.checkloggedIn, controller.getAllAttribute);
adminRouter.post('/attribute/add-attribute', controller.checkloggedIn, controller.postAddAttribute);
adminRouter.get('/attribute/edit-attribute/:id', controller.checkloggedIn, controller.getEditAttribute);
adminRouter.post('/attribute/edit-attribute/:id', controller.checkloggedIn, controller.postEditAttribute);
adminRouter.get('/attribute/delete-attribute/:id', controller.checkloggedIn, controller.postDeleteAttribute);
// attribute end

// attribute value start
adminRouter.post('/attribute/edit-attribute-value/:id', controller.checkloggedIn, controller.postAddAttributeValue);
adminRouter.get('/attribute/delete-attribute-value/:id', controller.checkloggedIn, controller.postDeleteAttributeValue);
// attribute value end

//brand start
adminRouter.get('/brands', controller.checkloggedIn, controller.getAllBrand);
adminRouter.post('/brand/add-brand', controller.checkloggedIn, controller.addBrandImage);
adminRouter.get('/brand/edit-brand/:id', controller.checkloggedIn, controller.getEditBrand);
adminRouter.post('/brand/edit-brand/:id', controller.checkloggedIn, controller.postEditBrand);
adminRouter.get('/brand/delete-brand/:id', controller.checkloggedIn, controller.postDeleteBrand);
//brand end


//brand start
adminRouter.get('/categories', controller.checkloggedIn, controller.getAllCategories);
adminRouter.post('/category/add-category', controller.checkloggedIn, controller.addCategory);
adminRouter.get('/category/edit-category/:id', controller.checkloggedIn, controller.getEditCategory);
adminRouter.post('/category/edit-category/:id', controller.checkloggedIn, controller.postEditCategory);
adminRouter.get('/category/delete-category/:id', controller.checkloggedIn, controller.postDeleteCategory);
//brand end




/*=============================================
=            Website template / start        =
=============================================*/
// slider /start ==============================================
adminRouter.get('/slides', controller.checkloggedIn, controller.getAllSlide);
adminRouter.post('/slide/add-slide', controller.checkloggedIn, controller.addSlide);
adminRouter.get('/slide/edit-slide/:id', controller.checkloggedIn, controller.getEditSlide);
adminRouter.post('/slide/edit-slide/:id', controller.checkloggedIn, controller.postEditSlide);
adminRouter.get('/slide/delete-slide/:id', controller.checkloggedIn, controller.postDeleteBrand);
// slider / end ==============================================
/*=====   Website template / end  ======*/




adminRouter.use((req, res, next) => {
  res.render('admin/notfound/notfound', {
    title: 'Trang Không tìm thấy'
  });
})


module.exports = adminRouter; 