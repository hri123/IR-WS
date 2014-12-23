var express = require('express');
var app = express();

xml2js = require('xml2js');
fs = require('fs');

var parser = new xml2js.Parser();

app.set("view options", {
  layout: false
});

// app.use('/', express.static(__dirname + '/app'));
app.use('/', express.static(__dirname + '/bower_components/mobile-angular-ui')); // http://localhost:3000/demo/#/ will take you to the mobile angular ui demo on local
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var rbFileNames = ['01-First-AnalysisParalysis.xml','02-BIY-PastMistakes.xml','03-BelieveInYourself.xml','04-Bhashya.xml','05-Brave.xml','06-Fabric.xml','07-Goals.xml','08-Guiltyfeeling.xml','09-Health.xml','10-Office.xml','11-Optimism.xml','12-Preface.xml','13-Present.xml','14-RelaxationResponse.xml','15-SacrificeFromOthers.xml','16-Last-Sacrifice.xml'];

app.get('/sampleJSON', function(req, res) {


	var index = 0;

	if (req.query.index) {
		index = req.query.index;
	}
	var data = fs.readFileSync( './RB-files/' + rbFileNames[index] );

	var articles = [];
	// by default it is sync (not async)
	parser.parseString(data, function (err, result) {

		articles = result.file.article;
	});

	res.send(articles);
  
});

// spin up server
app.listen(3000, '127.0.0.1')
