var Complaint = require('../models/complaint');
var fs = require('fs');
var mime = require('mime');
var multer = require('multer');
//var url = require('url');

// Handle Complaint create on POST.
exports.complaint_create_post = function (req, res) {
    // Create a Book object with escaped and trimmed data.
    var complaint = new Complaint();


    var storage = multer.diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
            cb(null, complaint._id + '.' + mime.getExtension(file.mimetype));
            //cb(null, file.originalname);

            // console.log(file);
        }
    });

    var upload = multer({
        storage: storage
    }).any();


    upload(req, res, function (err) {
        if (err) {
            throw err;
            //return res.end('Error uploading file.');
        } else {
            // console.log(req.body);
            // console.log(req.files);

            complaint.image.data = fs.readFileSync(req.files[0].path);
            complaint.image.contentType = req.files[0].mimetype;
            //complaint.image.contentType = mime.getExtension(req.files[0].mimetype);


            complaint.location = req.body.upload_location;
            complaint.description = req.body.upload_description;

            complaint.save(function (err) {
                if (err) {
                    throw err;
                }

                //console.log(req.files);
                /*
                                var sourceurl = new url.URL(req.headers.referer);

                                res.redirect(sourceurl.origin + '/done.html'); */

                res.send(true);

                // res.sendFile(__dirname + '/../www/done.html');

                //res.redirect('/done.html');

                fs.unlink(req.files[0].path, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        }

    });

};



// Display detail image for a specific Enquiry.
exports.complaint_image_get = function (req, res) {
    Complaint.findById(req.params.id)
        .exec(function (err, complaint) {
            if (err) {
                throw err;
            }

            res.contentType(complaint.image.contentType);
            res.send(complaint.image.data);

            //res.send(list_products);

        });
    // res.send('NOT IMPLEMENTED: Enquiry detail: ' + req.params.id);
};



// Complaint delete on POST.
exports.complaint_delete_post = function (req, res) {
    Complaint.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            throw err;
        }
        // Success - go to author list
        res.send(true);
    });
};


// Complaint update POST.
exports.complaint_update_post = function (req, res) {
    Complaint.findById(req.params.id)
        .exec(function (err, complaint) {
            if (err) {
                throw err;
            }

            complaint.status = true;

            Complaint.findByIdAndUpdate(req.params.id, complaint, {}, function (err) {
                if (err) {
                    throw err;
                }
                res.send(true);
            });
        });
};



// GET request for one complaint.
exports.complaint_detail_get = function (req, res) {
    Complaint.findById(req.params.id, '_id location description status dateformatted date')
        .exec(function (err, complaint) {
            if (err) {
                throw err;
            }
            res.send(complaint);
        });
};

// GET request for list of all complaints.
exports.complaint_dashboard_get = function (req, res) {
    Complaint.find({
                status: false
            },
            '_id location description status dateformatted date', {
                sort: {
                    date: -1 //Sort by Date Added DESC
                }
            })
        .exec(function (err, list_undone) {
            if (err) {
                throw err;
            }
            //Successful, so render
            res.render('dashboard', {
                complaints: list_undone
            });
            //res.send(list_products);
        });
};

exports.complaint_all_get = function (req, res) {
    Complaint.find({}, '_id location description status dateformatted date', {
            sort: {
                date: -1 //Sort by Date Added DESC
            }
        })
        .exec(function (err, list_all) {
            if (err) {
                throw err;
            }
            //Successful, so render
            res.render('dashboard', {
                complaints: list_all
            });
            //res.send(list_all);
        });
};

// GET request for search of all complaints.
exports.complaint_search_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Searching');
};

exports.complaint_delete_all_post = function (req, res) {
    Complaint.deleteMany({})
        .exec(function (err) {
            if (err) {
                throw err;
            }

            res.send(true);
        });
};