var Blog = require('../models/blog');

// Handle Blogpost create on POST.
exports.blog_create_post = function (req, res) {
    var blogpost = new Blog();
    blogpost.title = req.body.upload_title;
    blogpost.description = req.body.upload_description;
    blogpost.save(function (err) {
        if (err) {

            res.send(false);
            throw err;
        }
        res.send(true);
    });
};

// GET request for list of all blog posts.
exports.blog_all_get = function (req, res) {
    Blog.find({}, '_id title description dateformatted date', {
        sort: {
            date: -1 //Sort by Date Added DESC
        }
    })
        .exec(function (err, list_blogs) {
            if (err) {
                res.send(false);
                throw err;
            }        
            res.send(list_blogs);
        });
};

exports.blog_delete_all_get = function (req, res) {
    Blog.deleteMany({})
        .exec(function (err) {
            if (err) {
                res.send(false);
                throw err;
            }

            res.send(true);
        });
};