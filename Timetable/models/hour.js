// load the things we need
var mongoose = require('mongoose');

// define the schema for our post model
var hourSchema = mongoose.Schema({
    hour : String,
    mon : String,
    tues : String,
    wed : String,
    thurs : String,
    fri : String

});



// create the model for hour and expose it to our app
module.exports = mongoose.model('Hour', hourSchema);
