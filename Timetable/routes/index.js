// app/routes.js
module.exports = function(app, passport) {

var express = require('express');
var router = express.Router();
var ical2json = require("ical2json");
var Timetable  = require('../models/timetable');


	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================

	app.get('/', isLoggedIn, function(req, res) {
		res.render('index.ejs', {
			user : req.user // 
		});
	});

	// ======================================
	// INDEX=================================
	// ======================================
		// if successful login then go to meta tutorial page
		app.get('/index', isLoggedIn, function(req, res) {
		res.render('index.ejs', {
			user : req.user // 
		});
	});
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.render('authwall.ejs');
	});
	
	
// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.render('authwall.ejs');
}


	
	// HERE GOES THE TIMETABLE FUNCTIONS
	
	app.post('/icaldl', function(req,res,next){
	
	
		console.log("inside the icalroute");
		//variables to get the contents from the server. 
<<<<<<< HEAD
		var jsontable;
		var tablepath = path;
=======
		var tablepath = req.body;
>>>>>>> 939012de5e230b88c809dd47542b74e80fde8bc4
		var cont2 = false;
		var http = require('https');
		var fs = require('fs');
		var file = fs.createWriteStream("file.ics");
		var cont = false;
	

			var request = http.get( tablepath.path,function(response) {
			var test;
			// write the content to a file
			response.pipe(file);
			console.log("just piped the file")
			
<<<<<<< HEAD
			
			
			fs.readFile('file.ics', 'utf8', function (err,data) {
			  if (err) {
				return console.log(err);
			  }
			  // convert the date in the text file to json
			  jsontable  = ical2json.convert(data);
					console.log("%%%%%%%%%%%%%%");
					console.log(jsontable);
				  cont2 = true;
				  console.log("YOU MAY PASS");


			});
			
			
			jsontable = JSON.stringify(jsontable, undefined, 2);

			
			//console.log(jsontable);		
			//while(cont2== false){console.log("&&&")};
			
		//console.log(data+"***");
		});
		
		
		
		
		console.log("about to res!!!!!!!!!!!!!!!");
		res.json("comeback");

	});
	


	

	
};







