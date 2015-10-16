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

		writetofile(req.body);
		
	setTimeout(function() {
	
	
	
			console.log("about to res!!!!!!!!!!!!!!!");
			var fs = require('fs');
			var jsontable;
			// THIS  CONVERTS THE FILE TO JSON
			
		fs.readFile('file.ics', 'utf8', function (err,data) {
		  if (err) {
			return console.log(err);
			}
			 jsontable = ical2json.convert(data);
			 		var currevent ="" ;
					
			/////////////////////////
			 for(var i=0; i< jsontable.VEVENT.length; i++){
				//console.log(jsontable.VEVENT[i].SUMMARY);
				if(currevent ==""){
				
					currevent=	jsontable.VEVENT[i].SUMMARY;
					console.log(currevent);
					var sample = jsontable.VEVENT[i];
					var begintime = sample['DTSTART;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					var endtime = sample['DTEND;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					console.log(begintime[1]/10000);
					console.log(endtime[1]/10000);
				}
				if(currevent != jsontable.VEVENT[i].SUMMARY){
				
					currevent = jsontable.VEVENT[i].SUMMARY;
					console.log(currevent);
					var sample = jsontable.VEVENT[i];
					var begintime = sample['DTSTART;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					var endtime = sample['DTEND;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					console.log(begintime[1]/10000);
					console.log(endtime[1]/10000);

				} 
			 }
			/////////////////////////////

			console.log("!!!!!!!!!!!!!!!!!!!!!!");

		});
			
			
			
			
			
			
			
			
			
			
			
		res.json("comeback");

}, 2000);

	});
	

	var writetofile = function(path){
	
		console.log("insidecreatejason");
		//variables to get the contents from the server. 
		var fs = require('fs');
		var http = require('https');
		var jsontable;
		var url = path.path;
		var dest = "example.txt";
		

		download(url);
		
			
	

	};

	

	var download = function(url,cb) {
	
		var http = require('https');
		var fs = require('fs');

var file = fs.createWriteStream("file2.ics");


 
 
 http.get(url, function(response){
	    response.pipe(file);
		console.log("after pipe");
 
 })
 
console.log(" done ...");
		
		
		
		
		
		};

	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
};







