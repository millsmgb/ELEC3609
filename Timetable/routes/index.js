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


module.exports = router;