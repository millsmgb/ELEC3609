var express = require('express');
var router = express.Router();
var ical2json = require("ical2json");

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
	

	var file = fs.createWriteStream("file.ics");
	var request = http.get( tablepath.path,function(response) {
	  response.pipe(file);
	  console.log("************");
	  
	  
	 // var jsonical = ical2json.convert(file);


	});


	
	
	
	
	
	
	res.json({name: "cvid6070"});
	
	

});










module.exports = router;