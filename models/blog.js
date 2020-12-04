var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: {
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
    date: {
        type: Date,
        default: Date.now
    }
});


BlogSchema.virtual('dateformatted').get(function () {
    return moment(this.date).format('MMMM Do, YYYY');
});



//Export model
module.exports = mongoose.model('Blog', BlogSchema);