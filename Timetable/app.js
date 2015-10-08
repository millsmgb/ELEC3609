var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//ical conversion to json
var ical2json = require("ical2json");
var mongoose = require('mongoose');
var db = mongoose.connection;

 
//var output = ical2json.convert(icalData);

//MongoDB connection

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
mongoose.connect('mongodb://localhost/tms');
var db = mongoose.connection;

// this will test the connection of mongoose to the database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("CONNECTION WORKS!!");
  
  var kittySchema = mongoose.Schema({
    name: String
	});
	var Kitten = mongoose.model('Kitten', kittySchema);
	var silence = new Kitten({ name: 'Silence' });

// this is a test insert
	silence.save(function(err, user_Saved){
		if(err){
			throw err;
			console.log(err);
		}else{
			console.log('saved!');
		}
	});

  
});




//var url = 'mongodb://localhost:27017/testdb';

//Test insert into connected MongoDB collection


//Test a MongoDB query to find all restaurants



//Mongo Test insert into restaurant database -- Example database to test MongoDB works


//Establishing appropriate routes - currently in Jade format

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
/*
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

*/

// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/
console.log('This is here');

module.exports = app;

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Example app listening at http://%s:%s', host, port);
	
	
	
	
	
	
	
	
	
	
app.post('/icaldl', function(req,res){
	console.log("INSIDE THE INDEX ROUTE FILE");
	//console.log(req.body);
	res.json({name: "cvid6070"});

});



	
	
	
	
});
