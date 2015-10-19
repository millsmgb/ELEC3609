// app/routes.js
module.exports = function(app, passport) {

var express = require('express');
var router = express.Router();
var ical2json = require("ical2json");
var Timetable  = require('../models/timetable');
var moment = require('moment');
moment().format();
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

		writetofile(req.body); // 1
		
		setTimeout(function() {
	
			console.log("about to res!!!!!!!!!!!!!!!");
			var fs = require('fs');
			var jsontable;
			var unityear;
			var unitmonth;
			var unitday;
			// THIS  CONVERTS THE FILE TO JSON
			
		// get file that was written from link
		fs.readFile('file.ics', 'utf8', function (err,data) {
		  if (err) {
			return console.log(err);
			}
			 jsontable = ical2json.convert(data);
			 		var currevent ="" ;
					
				// here the json is created from the file with the timetable data
			 for(var i=0; i< jsontable.VEVENT.length; i++){
				//console.log(jsontable.VEVENT[i].SUMMARY);
	
				// this find the first unique unit in the timetable file
				if(currevent != jsontable.VEVENT[i].SUMMARY ){

					currevent = jsontable.VEVENT[i].SUMMARY;
					console.log(currevent);
					var sample = jsontable.VEVENT[i];
					var begintimesplit = sample['DTSTART;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					var begintime = begintimesplit[1]/10000;
					var endtimesplit = sample['DTEND;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					var endtime = endtimesplit[1]/10000;
					var stringday;
					// this is to get the yyyy/mm/dd from the string
					unityear = begintimesplit[0].substring(0,4);
					unitmonth = begintimesplit[0].substring(4,6);
					unitday = begintimesplit[0].substring(6,8);
					var tabledate =  new moment(unityear+"-"+unitmonth+"-"+unitday);
					//now go set the date this unit was on.
					// now to get the day of the week this date was on
					var weekday = tabledate.day();
					if(weekday ==1)
						console.log("MON");	
					else if(weekday ==2)
						console.log("TUES");	
					else if(weekday ==3)
						console.log("WED");	
					else if(weekday ==4)
						console.log("THURS");
					else if(weekday ==5)
						console.log("FRI");						
					
					// function to get the times between the beginning and end
					var timediff = endtime - begintime;
					var inbetween = [];
					inbetween = between(inbetween,timediff,begintime);
					createrecords();
					console.log("----")

				} 
			 }

			console.log("!!!!!!!!!!!!!!!!!!!!!!");

		});
					
		res.json("comeback");

}, 2000);

	});
	
	var createrecords = function(){
	
	
	}
	
	var between = function(inbetween,timediff,begintime){
	
		for(var i=0; i<= timediff; i++){
			console.log(i + begintime);
			inbetween[i-0] = (i+begintime);
		}
		
		return inbetween;

	
	
	
	}

	var writetofile = function(path){
	
		console.log("insidecreatejason");
		//variables to get the contents from the server. 
		var fs = require('fs');
		var http = require('https');
		var jsontable;
		var url = path.path;		
		
		download(url); //2
	};

	var download = function(url,cb) {
	
		var http = require('https');
		var fs = require('fs');

	var file = fs.createWriteStream("file.ics");
	http.get(url, function(response){
	    response.pipe(file);
		console.log("after pipe");
	})
	console.log(" done writing to file ...");	
	};

	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
};







