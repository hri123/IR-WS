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
		file.article.push(massageArticle(articles[i]));
	}

	fs.writeFile(rbFileNames[index], js2xmlparser("file", file), function (err) {
  		if (err) throw err;
  	});

	// console.log(js2xmlparser("file", file));

	res.send("done!");
  
});


var massageArticle = function (inArticle) {

	var outArticle = {};

	outArticle.tags = inArticle.tags;
	outArticle.rating = inArticle.rating;
	outArticle.summary = inArticle.summary;
	outArticle.from = inArticle.from;

	outArticle.content = getStructure(inArticle.content[0]);
	outArticle.annotation = getStructure(inArticle.annotation[0]);
	
	return outArticle;

};

var getStructure = function(data) {

	var returnVal = {};

	if(typeof data =='object') {
		returnVal.main = data._;
		if(data.section) {
			var sections = [];

			var sectionsLength = data.section.length;
			for (var j = 0; j < sectionsLength; j++) {

				var currentSection = data.section[j];
				
				var section = {};

				if (typeof currentSection == 'object') {
					section.main = currentSection._;
				} else {
					section.main = currentSection;
				}

				if (currentSection.$) {
					section['@'] = {};
					section['@'].name = currentSection.$.name;
				}

				if (currentSection['sub-section']) { // hyphen is interpreted as minus in javascript, so cannot use currentSection.sub-section
					var temp_sub_sections = [];

					var sub_sectionsLength = currentSection['sub-section'].length;

					for (var k = 0; k < sub_sectionsLength; k++) {

						var currentSubSection = currentSection['sub-section'][k];
						
						var sub_section = {};

						if (typeof currentSubSection == 'object') {
							sub_section.main = currentSubSection._;
						} else {
							sub_section.main = currentSubSection;
						}

						if (currentSubSection.$) {
							sub_section['@'] = {};
							sub_section['@'].name =currentSubSection.$.name;
						}

						temp_sub_sections.push(sub_section);
					}

					section.sub_section = temp_sub_sections;

				}

				sections.push(section);
			}

			returnVal.section = sections;

		}
	} else {
		returnVal.main = data;
	}

	return returnVal;

};


// spin up server
app.listen(3000, '127.0.0.1')
