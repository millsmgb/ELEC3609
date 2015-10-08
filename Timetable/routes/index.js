var express = require('express');
var router = express.Router();
var ical2json = require("ical2json");
var Timetable  = require('../models/timetable');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
    var icallink = req.body.submit;
	var output = ical2json.convert(icallink);
	console.log(output);
    res.send('Post page');
});



router.post('/icaldl', function(req,res){
	console.log("INSIDE THE INDEX ROUTE FILE");
	//console.log(req.body);
	
	var tablepath = req.body;
	var http = require('https');
	var fs = require('fs');
	var output;

	var file = fs.createWriteStream("file.ics");
	var request = http.get( tablepath.path,function(response) {

		response.pipe(file);
		
		fs.readFile('file.ics', 'utf8', function (err,data) {
		  if (err) {
			return console.log(err);
		  }
		  
		  output = ical2json.convert(data);
		});

		
		var insert = new Timetable(output);
		
		insert.save(function(err, user_Saved){
			if(err){
				throw err;
				console.log(err);
			}else{
				console.log('insertet the ical');
			}
	});
	   console.log("************");
	});


	
	
	
	
	
	
	res.json({name: "cvid6070"});
	
	

});










module.exports = router;