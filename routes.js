var express = require('express');
var router = express.Router();


// User side pages -----


router.get('/', function (req, res) {
    res.redirect('/dashboard');
});

router.get('/contact', function (req, res) {
    res.render('contact',  {
        status: false
    });
});

router.get('/about', function (req, res) {
    res.render('about');
});
/*
router.get('/support', function (req, res) {
    res.render('support');
});

router.get('/privacypolicy', function (req, res) {
    res.render('privacypolicy');
});

router.get('/logout', function (req, res) {
    res.redirect('/');
});

// -----

// Admin routes -----
/*
router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {
    //- console.log(req.body);
    if (req.body.username == 'sagar' && req.body.password == 'sparc') {
        res.redirect('/dashboard');
    } else {
        res.render('login', {
            failure: true
        });
    }

});
*/

// Data Routes -----

// var async = require('async')

// Require controller modules.

var complaint_controller = require('./controllers/complaintController');

/// PRODUCT ROUTES ///


// GET request for creating complaint.
router.get('/complaint/create', function (req, res) {
    res.redirect('/dashboard');
});

// POST request for creating complaint.
router.post('/complaint/create', complaint_controller.complaint_create_post);

// POST request to delete complaint.
router.post('/complaint/:id/delete', complaint_controller.complaint_delete_post);

// POST request to update complaint.
router.post('/complaint/:id/update', complaint_controller.complaint_update_post);

// GET request for one complaint.
router.get('/complaint/:id', complaint_controller.complaint_detail_get);

// GET request for list of all complaints.
router.get('/dashboard', complaint_controller.complaint_dashboard_get);

router.get('/complaints/all', complaint_controller.complaint_all_get);

// GET request for search of all complaints.
router.get('/complaints/search', complaint_controller.complaint_search_get);

// GET request for one complaint image.
router.get('/complaint/image/:id', complaint_controller.complaint_image_get);

router.post('/complaints/all/delete', complaint_controller.complaint_delete_all_post);








var blog_controller = require('./controllers/blogController');

/// BLOG ROUTES ///

// POST request for creating blog post.
router.post('/blog/create', blog_controller.blog_create_post);

// GET request for viewing posts.
router.get('/blog/all', blog_controller.blog_all_get);

// GET request for deleting posts.
router.get('/blog/all/delete', blog_controller.blog_delete_all_get);




//export this router to use in our index.js
module.exports = router;
