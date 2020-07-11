var pool = require('../../config/connectDb');

let homeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        pool.query('SELECT * FROM `user', function (error, results, fields) {
            if (error) throw error;
            res.render('admin/home/home', {
                title: 'Trang chủ',
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: results[0]
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = homeController;