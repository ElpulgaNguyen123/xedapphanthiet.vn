
// Frontend controller start
const FrhomeController = require('./homeController');
const FrAboutController = require('./aboutController');
const FrContactController = require('./contactController');
const {FrBlogController,
    FrBlogDetailController} = require('./blogController');

module.exports = {
    FrhomeController,
    FrAboutController,
    FrContactController,


    FrBlogController,
    FrBlogDetailController
}