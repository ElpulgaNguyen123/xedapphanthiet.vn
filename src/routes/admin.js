var express = require('express');
var adminRouter = express.Router();
var {validateRegister, validateEmailResetpassword} = require('../validator');
var controller = require('../model/controllers/admin');
// authencation

adminRouter.get('/login', controller.loginController);
adminRouter.get('/register', controller.registerController);
adminRouter.post('/register', validateRegister ,controller.PostRegisterController);
adminRouter.get('/reset-password', controller.resetPasswordController);
adminRouter.post('/reset-password', validateEmailResetpassword, controller.PostResetPasswordController);
adminRouter.get('/reset-password/:token', controller.resetPasswordGetToken);

// authencation / end
adminRouter.get('/', controller.homeController);

// products router
adminRouter.get('/products', controller.getAllProduct);
adminRouter.get('/products/add-product', controller.addProductGet);
adminRouter.post('/product/add-product-image', controller.addProductImage);
adminRouter.post('/products/add-product', controller.addProductPost);
adminRouter.get('/product/edit-product/:id', controller.editProductGet);

module.exports = adminRouter;