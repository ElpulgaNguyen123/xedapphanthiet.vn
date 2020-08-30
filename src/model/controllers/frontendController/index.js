
// Frontend controller start
const FrhomeController = require('./homeController');
const FrAboutController = require('./aboutController');
const FrContactController = require('./contactController');
const {FrBlogController,
    FrBlogDetailController} = require('./blogController');
    const {FrBikeController,
        FrBikeDetailController} = require('./bikeController');

module.exports = {
    FrhomeController,
    FrAboutController,
    FrContactController,


    FrBlogController,
    FrBlogDetailController,

    FrBikeController,
    FrBikeDetailController
}