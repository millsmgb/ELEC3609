// load the things we need
var mongoose = require('mongoose');

// define the schema for our post model
var timetableSchema = mongoose.Schema({
    comment : String,
	upvotes: Number,
	author: String
});



// create the model for post and expose it to our app
module.exports = mongoose.model('Timetable', timetableSchema);
