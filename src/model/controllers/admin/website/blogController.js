var pool = require('../../../config/connectDb');
var app = require('../../../config/app');
var service = require('../../../../services');
var multer = require('multer');
var { uuid } = require('uuidv4');
var { Transuccess} = require('../../../../../lang/vi');
var sharp = require('sharp');
var fs = require('fs');
var fsExtras = require('fs-extra');

// initial storage. // start
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, app.directory_products);
        cb(null, app.directory_blogs);
    },
    filename: function (req, file, cb) {
        // let match = app.avatar_type;
        let match = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        cb(null, file.originalname);
    }
});
var productUploadFile = multer({ storage: storage }).single('blog_image');
// initial storage. // end

// get all Blog // start
let getAllBlog = async (req, res, next) => {
    try {
        await pool.query('SELECT * FROM blog', function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/website/blog/blog', {
                title: 'Blog',
                blogs: rows,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
                user: req.user
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// get all Blog // end

// add more Blog // start
let addBlogGet = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var user = req.user || {};
        res.render('admin/website/blog/add-blog', {
            title: 'Thêm bài viết',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// add more Blog // end

// add image Blog // start
let addBlogPost = (req, res, next) => {
    productUploadFile(req, res, (error) => {
        try {

            var arrayError = [],
                successArr = [];
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(600, 400)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, (err, info) => {
                        fs.unlinkSync(req.file.path);
                    });
            }
            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            let current_datetime = new Date()
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
            var queryNew = `INSERT INTO blog (title,slug, 
                content, 
                short_description, image, 
                author, create_at) VALUES ?`;
            var blogValues = [
                [req.body.blog_title,
                req.body.blog_slug,
                req.body.blog_content,
                req.body.short_description,
                    filename,
                req.body.blog_author,
                formatted_date]
            ];
           
            pool.query(queryNew, [blogValues], function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.createSuccess('Blog'));
                req.flash('Success', successArr);
                res.redirect('/admin/blog');
            });
        } catch (error) {
            console.log(error);
            res.render('admin/notfound/notfound', {
                title: 'Trang Không tìm thấy'
            });
        }
    })
}
// add more Blog // end

// edit Blog get method // start
let getEditBlog = async (req, res, next) => {
    try {
        var blog_id = req.params.id;
        var arrayError = [],
            successArr = [];
        var query = `SELECT * FROM blog WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        await pool.query(query, blog_id, function (error, rows, fields) {
            if (error) throw error;
            res.render('admin/website/blog/edit-blog', {
                blog: rows[0],
                user: req.user,
                errors: req.flash('Errors'),
                success: req.flash('Success'),
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// edit Blog get method // end

// edit blog post method // start
let postEditBlog = (req, res, next) => {
    productUploadFile(req, res, async (error) => {
        try {
            // Lấy tất cả sản phẩm và hiển thị ra table
            var arrayError = [],
                successArr = [];
            var generatecode = uuid();
            if (req.file) {
                // resize image before uploads.
                sharp(`${req.file.destination}/${req.file.filename}`)
                    .resize(600, 400)
                    .toFile(`${req.file.destination}/${req.file.filename}-${generatecode}.webp`, async (err, info) => {
                        fs.unlinkSync(req.file.path);
                        if (req.body.blog_old_image) {
                            await fsExtras.remove(`${app.directory_blogs}/${req.body.blog_old_image}`);
                        }
                    });
            }

            var filename = '';
            if (req.file) {
                filename = `${req.file.filename}-${generatecode}.webp`;
            }
            else if (req.body.blog_old_image) {
                filename = `${req.body.blog_old_image}`;
            }

            let current_datetime = new Date()
            let formatted_date_update = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
            console.log(formatted_date);

            var queryUpdate = `
            UPDATE blog
            SET title = ?, 
            slug = ?, 
            content = ?,
            short_description = ?,
            image = ?,
            author = ?,
            update_at = ?
            WHERE id = ?`
            var blogValues = [
                req.body.blog_title,
                    req.body.blog_slug,
                    req.body.blog_content,
                    req.body.short_description,
                        filename,
                    req.body.blog_author,
                    formatted_date_update,
                    req.params.id
                
            ]
            await pool.query(queryUpdate, blogValues, function (error, results, fields) {
                if (error) throw error;
                successArr.push(Transuccess.saveSuccess('BLog'));
                req.flash('Success', successArr);
                res.redirect('/admin/blog');
            });
        } catch (error) {
            console.log(error);
        }
    })
}
// edit blog post method // end

// delete blog // start
let postDeleteBlog = async (req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        var arrayError = [],
            successArr = [];

        var blog_id = req.params.id;
        var query = `SELECT * FROM blog WHERE id = ?`;
        // Lấy tất cả sản phẩm và hiển thị ra table
        var Image_delete = await service.queryActionBlogelete(query, blog_id);
        var querydeleteblog = `
        DELETE FROM 
        blog
        WHERE id = ${blog_id}`;
        pool.query(querydeleteblog, async function (error, results, fields) {
            if (error) throw error;
            if (Image_delete != null || Image_delete != '') {
                await fsExtras.remove(`${app.directory_blogs}/${Image_delete}`);
            }
            successArr.push(Transuccess.deleteSuccess('Blog'));
            req.flash('Success', successArr);
            res.redirect('/admin/blog');
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
// delete blog // end

module.exports = {
    getAllBlog,
    addBlogGet,
    addBlogPost,
    getEditBlog,
    postEditBlog,
    postDeleteBlog
};