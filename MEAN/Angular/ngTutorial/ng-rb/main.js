var express = require('express');
var app = express();

var js2xmlparser = require('js2xmlparser'); // using diff module for js to xml to make sure nothing is lost during conversion

xml2js = require('xml2js');
fs = require('fs');

var parser = new xml2js.Parser();

app.set("view options", {
  layout: false
});

app.use('/', express.static(__dirname + '/app'));
// app.use('/', express.static(__dirname + '/bower_components/mobile-angular-ui')); // http://localhost:3000/demo/#/ will take you to the mobile angular ui demo on local
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


app.get('/exportForVerification', function(req, res) {


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

	var file = {};

	file.article = [];

	var articlesLength = articles.length;
	for (var i = 0; i < articlesLength; i++) {
		file.article.push(massageArticleForExport(articles[i]));
	}

	fs.writeFile(rbFileNames[index], js2xmlparser("file", file), function (err) {
  		if (err) throw err;
  	});

	// console.log(js2xmlparser("file", file));

	res.send("done!");
  
});

var massageArticleForExport = function (inArticle) {

	var outArticle = {};

	outArticle.tags = inArticle.tags;
	outArticle.rating = inArticle.rating;
	outArticle.summary = inArticle.summary;
	outArticle.from = inArticle.from;

	var utils = require('./app/js/utils.js');

	outArticle.content = utils.getStructure(inArticle.content[0]);
	outArticle.annotation = utils.getStructure(inArticle.annotation[0]);
	
	return outArticle;

};

// spin up server
app.listen(3000, '127.0.0.1')
