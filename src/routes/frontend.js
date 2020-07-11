var express = require('express');
var frontendRouter = express.Router();
var controller = require('../model/controllers/frontendController');

frontendRouter.get('/', controller.FrhomeController);

// products router
// adminRouter.get('/products', controller.getAllProduct);
// adminRouter.get('/products/add-product', controller.addProductGet);
// adminRouter.post('/product/add-product-image', controller.addProductImage);
// adminRouter.post('/products/add-product', controller.addProductPost);
// adminRouter.get('/product/edit-product/:id', controller.editProductGet);

module.exports = frontendRouter;