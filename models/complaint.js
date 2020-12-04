var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ComplaintSchema = new Schema({
    location: {
        type: String,
        //required: true,
        max: 100,
        default: 'unknown'
    },
    description: {
        type: String,
        max: 10000,
        default: ''
    },
    status: {
        type: Boolean,
        //required: true,
        default: false
    },
    image: {
        data: {
            type: Buffer,   
        },
        contentType: {
            type: String,
            max: 15,
            default: 'png'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});


ComplaintSchema.virtual('dateformatted').get(function () {
    return moment(this.date).format('MMMM Do, YYYY');
});



//Export model
module.exports = mongoose.model('Complaint', ComplaintSchema);