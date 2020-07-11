var pool = require('../../config/connectDb');

let FrhomeController = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        pool.query('SELECT * FROM `user', function (error, results, fields) {
            if (error) throw error;
            res.render('xedapphanthiet/home/home', {
                title: 'Trang chủ',
                errors: req.flash('Errors'),
                success: req.flash('Success'),
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = FrhomeController;