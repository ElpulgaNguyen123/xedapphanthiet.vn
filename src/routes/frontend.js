var express = require('express');
var frontendRouter = express.Router();
var controller = require('../model/controllers/frontendController');

frontendRouter.get('/', controller.FrhomeController);
frontendRouter.get('/gioi-thieu', controller.FrAboutController);
frontendRouter.get('/lien-he', controller.FrContactController);


frontendRouter.get('/blog', controller.FrBlogController);
frontendRouter.get('/blog/*.:id', controller.FrBlogDetailController);

// frontendRouter.get('/bikes', controller.FrBlogController);
// frontendRouter.get('/bike/?.:id', controller.FrBlogController);


// products router
// adminRouter.get('/products', controller.getAllProduct);
// adminRouter.get('/products/add-product', controller.addProductGet);
// adminRouter.post('/product/add-product-image', controller.addProductImage);
// adminRouter.post('/products/add-product', controller.addProductPost);
// adminRouter.get('/product/edit-product/:id', controller.editProductGet);

module.exports = frontendRouter;