var express = require('express');
var app = express();

var passport = require('passport');
var DropboxStrategy = require('passport-dropbox').Strategy;

// for the app - rBookApp (Register your application (or in this case a dummy application) with all of the OAuth providers you want to use, except Google - as Google uses OpenID)

// Put the keys and secrets in a file called oauth.js in the same directory as main.js
// var ids = {
//     dropbox: {
//         clientID: 'get_your_own',
//         clientSecret: 'get_your_own',
//         callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
//     }
// }
// module.exports = ids

var config = require('./oauth.js');

// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// config
passport.use(new DropboxStrategy({
        consumerKey: config.dropbox.clientID, // "--insert-dropbox-app-key-here--"
        consumerSecret: config.dropbox.clientSecret, //"--insert-dropbox-app-secret-here--";
        callbackURL: config.dropbox.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }
));


var js2xmlparser = require('js2xmlparser'); // using diff module for js to xml to make sure nothing is lost during conversion

xml2js = require('xml2js');
fs = require('fs');

var parser = new xml2js.Parser();

app.configure(function() {
    app.set("view options", {layout: false});
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: 'my_precious'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
	
	app.use(express.static(__dirname + '/app'));
	// app.use('/', express.static(__dirname + '/bower_components/mobile-angular-ui')); // http://localhost:3000/demo/#/ will take you to the mobile angular ui demo on local
	app.use('/bower_components', express.static(__dirname + '/bower_components'));
});

app.get('/home', ensureAuthenticated, function(req, res) {
    res.sendfile(__dirname + '/app' + '/' + 'index.html');
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/app' + '/' + 'login.html');
});

app.get('/auth/dropbox',
    passport.authenticate('dropbox'),
    function(req, res) {});
app.get('/auth/dropbox/callback',
    passport.authenticate('dropbox', {
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/home');
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

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
app.listen(3000, '0.0.0.0')
