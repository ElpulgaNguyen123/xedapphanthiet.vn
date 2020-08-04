var pool = require('../../config/connectDb');

let homeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var user = req.user || {};
        res.render('admin/home/home', {
            title: 'Trang chủ',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = homeController;