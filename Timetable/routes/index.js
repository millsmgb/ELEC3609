// app/routes.js
module.exports = function(app, passport) {

var express = require('express');
var router = express.Router();
var ical2json = require("ical2json");
var Timetable  = require('../models/timetable');
var moment = require('moment');
var hour = require('../models/hour');


	app.use(function(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
	});

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

	app.post('/signupauth', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.render('authwall.ejs',  { message: req.flash('signupMessage') });
	});
	
	app.get('/retrieve', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('retrieve.ejs');
	});
	
// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.render('authwall.ejs',  { message: req.flash('signupMessage') });
}

	
	// HERE GOES THE TIMETABLE FUNCTIONS
	
	app.post('/icaldl', function(req,res,next){
	
	

		writetofile(req.body); // 1
		
		setTimeout(function() {
			console.log("INSIDE TIMEOUT")
			var returnable = createjsontable();
		// return the filled out timetable in json format
			res.json(JSON.stringify(returnable));
		//	res.json();

		}, 2500);

	});

	app.post('/icalfile', function(req,res,next){
	setTimeout(function() {
		var returnable = createjsontable();
		res.json(JSON.stringify(returnablee));
	},2500);
});




	var createjsontable = function(){
		
		function tablesection (i){
			this.hour = i;
			this.mon = "";
			this.tues = "";
			this.wed = "";
			this.thurs = "";
			this.fri = "";
		}

	
		var tabletemplate = [];
		
		for(var i = 0; i<19; i++){
			tabletemplate[i] =  new tablesection(i);
		};	
		
			console.log("about to create json file");
			var fs = require('fs');
			var jsontable;
			var unityear;
			var unitmonth;
			var unitday;
			var readfiledata;
			var templateinstance = tabletemplate ;
			// THIS  CONVERTS THE FILE TO JSON
		// get file that was written from link
	
	
			var xfile = fs.readFileSync("file.ics").toString();
			
			
			// ical2json conversion
			 jsontable = ical2json.convert(xfile);
			 var currevent ="" ;
			

				// here the json is created from the file with the timetable data
			 for(var i=0; i< jsontable.VEVENT.length; i++){

				// this find the first unique unit in the timetable file
				if(currevent != jsontable.VEVENT[i].SUMMARY ){
				
					currevent = jsontable.VEVENT[i].SUMMARY; // event name
					var sample = jsontable.VEVENT[i]; // 
					var begintimesplit = sample['DTSTART;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					var begintime = begintimesplit[1]/10000;
					var endtimesplit = sample['DTEND;TZID=Australia/Sydney;VALUE=DATE-TIME'].split("T");
					var endtime = endtimesplit[1]/10000;
					// this is to get the yyyy/mm/dd from the string
					unityear = begintimesplit[0].substring(0,4);
					unitmonth = begintimesplit[0].substring(4,6);
					unitday = begintimesplit[0].substring(6,8);
					var tabledate =  new moment(unityear+"-"+unitmonth+"-"+unitday);
					// now to get the day of the week this date was on
					var weekday = tabledate.day();
					// function to get the times between the beginning and end
					var timediff = endtime - begintime;
					templateinstance = between(timediff,begintime,currevent,weekday,templateinstance);
				} 
			 }


			return templateinstance;
	
	};
	
	
	var between = function(timediff,begintime,currevent,weekday,templateinstance){
		
		for(var i=0; i<= timediff; i++){
				templateinstance[i +begintime].hour = i+begintime;

					if(weekday ==1){
						templateinstance[i +begintime].mon = currevent;

						}
					else if(weekday ==2){
						templateinstance[i +begintime].tues = currevent;
					}
					else if(weekday ==3){
						templateinstance[i +begintime].wed = currevent;
					}
					else if(weekday ==4){
						templateinstance[i +begintime].thurs = currevent;
					}
					else if(weekday ==5){
						templateinstance[i +begintime].fri = currevent;
					}
		}
		
		return templateinstance;
	
	
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







