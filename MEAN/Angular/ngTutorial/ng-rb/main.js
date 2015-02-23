// http://stackoverflow.com/questions/1911015/how-to-debug-node-js-applications

var express = require('express');
var app = express();

var passport = require('passport');
var DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

var shortId = require('shortid');

// for the app - rBookApp (Register your application with all of the OAuth providers you want to use, except Google - as Google uses OpenID)

// Put the keys and secrets in a file called oauth.js in the same directory as main.js
// var ids = {
//     dropbox: {
//         clientID: 'get_your_own',
//         clientSecret: 'get_your_own',
//         callbackURLLocal: 'http://localhost:3000/auth/dropbox/callback',
//         callbackURLBluemix: 'https://ng-rb.mybluemix.net/auth/dropbox/callback'
//     }
// }
// module.exports = ids

var config = require('./app/js/server/oauth.js');
var myDropboxUtils = require('./app/js/server/dropbox.js');

// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var accessTokenGlobal = {};

var tempCallbackURL = config.dropbox.callbackURLLocal;
if (process.env.VCAP_APP_PORT) // if on bluemix
    tempCallbackURL = config.dropbox.callbackURLBluemix;

// config
passport.use(new DropboxStrategy({
        clientID: config.dropbox.clientID, // "--insert-dropbox-app-key-here--"
        clientSecret: config.dropbox.clientSecret, //"--insert-dropbox-app-secret-here--";
        callbackURL: tempCallbackURL
    },
    function(accessToken, refreshToken, profile, done) {
    	accessTokenGlobal['id_' + profile.id] = accessToken;
    	// console.log("profile: " + JSON.stringify(profile));
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
    // app.use(express.logger()); // prints too much log
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
    passport.authenticate('dropbox-oauth2'),
    function(req, res) {});

// Error : Invalid redirect_uri: "http://localhost:3000/auth/dropbox/callback" (https://ng-rb.mybluemix.net/auth/dropbox/callback).
// for OAuth2, the above URL needs to be registered with the app in dropbox app configuration page under OAuth2 - Redirect URIs

app.get('/auth/dropbox/callback',
    passport.authenticate('dropbox-oauth2', {
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

var Dropbox = require("dropbox");


var tempTempArticle;
app.get('/writeJSON', ensureAuthenticated, function(req, res) {

    var client = new Dropbox.Client({
        key: config.dropbox.clientID,
        secret: config.dropbox.clientSecret,
        token: accessTokenGlobal['id_' + req.user.id],
        sandbox:false
    });

    if (client.isAuthenticated()) {

        var selectedArea = req.query.area;
        var selectedProject = req.query.project;

        // TODO: if the selectedArea and/or selectedProject does not exist, need to create it instead of throwing error
        client.readdir("/" + selectedArea + "/" + selectedProject, function(error, entries, stat) {
            if (error) {
                console.log("error during readdir: " + error); // Something went wrong.
                res.send(500);
            } else {
                console.log("Your Dropbox contains " + entries);

                // TODO: extract the first tag of the article instead of sacrifice-from-others, if not present, unknown
                client.writeFile("/" + selectedArea + "/" + selectedProject + "/" + "sacrifice-from-others" + "/" + shortId.generate() + ".json",
                    JSON.stringify(tempTempArticle),
                    {},
                    function(error) {
                        console.log("error during write file: " + error); // Something went wrong.
                        res.send(500);
                });
                
                res.send(200);
            }
        });

    } else {
        console.log('dropbox client is not authenticated'); // Something went wrong.
        res.send(500);
    }
  
});

app.get('/readJSON', ensureAuthenticated, function(req, res) {

    var client = new Dropbox.Client({
        key: config.dropbox.clientID,
        secret: config.dropbox.clientSecret,
        token: accessTokenGlobal['id_' + req.user.id],
        sandbox:false
    });

    myDropboxUtils.resetProjectAreas(client, myDropboxUtils.projectAreas);

    if (client.isAuthenticated()) {

        var selectedArea = req.query.area;
        var selectedProject = req.query.project;

        client.readdir("/" + selectedArea + "/" + selectedProject, function(error, entries, stat) {
            if (error) {
                console.log("error during readdir: " + error); // Something went wrong.
                res.send(500);
            } else {
                console.log("Your Dropbox contains " + entries);

                var totalNumOfFiles = 0;
                var articles = [];

                for (var i = 0; i < entries.length; i++) {
                    var dirName = "/" + selectedArea + "/" + selectedProject + "/" + entries[i];
                    // scope is required because the dirName would have got updated before all the files in the folder dirName are read
                    // error during readFile:Dropbox API error 404 from GET https://api-content.dropbox.com/1/files/auto/attitude/rb/sacrifice-
                    // from-others%20-%20Copy%20%289%29/Q1elgkjw.json :: {"error": "File not found"}
                    (function(dirName) {
                        client.readdir(dirName, function(error, sub_entries) {
                            if (error) {
                                console.log("error during readdir: " + error); // Something went wrong.
                                res.send(500);
                            } else {
                                totalNumOfFiles += sub_entries.length;
                                for (var j = 0; j < sub_entries.length; j++) {
                                    client.readFile(dirName + '/' + sub_entries[j], function(error, data) { // data has the file's contents
                                        if (error) {
                                            console.log("error during readFile:" + error); // Something went wrong.
                                            res.send(500);
                                        } else {
                                            articles.push(JSON.parse(data));
                                            totalNumOfFiles -= 1;
                                            // res.send should be after loading all the files
                                            if (totalNumOfFiles == 0)
                                                res.send(articles);
                                        }
                                    });
                                }
                            }
                        });
                    })(dirName);
                }
            }
        });

    } else {
        console.log('dropbox client is not authenticated'); // Something went wrong.
        res.send(500);
    }
  
});

app.get('/sampleJSON', function(req, res) {

	// console.log("req.user: " + JSON.stringify(req.user));
	// console.log("accessTokenGlobal: " + JSON.stringify(accessTokenGlobal));
	
	// console.log("accessTokenGlobal['id_' + req.user.id]: " + accessTokenGlobal['id_' + req.user.id]);

	var client = new Dropbox.Client({
	    key: config.dropbox.clientID,
	    secret: config.dropbox.clientSecret,
	    token: accessTokenGlobal['id_' + req.user.id],
	    sandbox:false
	});

	// Error: Dropbox API error 401 from GET https://api11.dropbox.com/1/account/info :: {"error": "The given OAuth 2 access token doesn't exist or has expired."}
	// problem was passing OAuth1 token gotten from passport-dropbox to dropbox, then upgraded to passport-dropbox-oauth2 package
	if (client.isAuthenticated()) {
    	client.getAccountInfo(function(error, accountInfo) {
    	    if (error) {
    	        console.log(error); // Something went wrong.
    	    }
    	    // console.log("accountInfo: " + JSON.stringify(accountInfo));
    	});

    	client.readdir("/", function(error, entries) {
    	    if (error) {
    	        console.log(error); // Something went wrong.
    	    }

    	    // console.log("Your Dropbox contains " + entries.join(", "));
    	});
    	client.readFile('./RB-files/' + "15-SacrificeFromOthers.xml", function(error, data) { // data has the file's contents
    	    
    	    var articles = [];

    	    if (error) {
    	        console.log(error); // Something went wrong.
    	    } else {
	    	    parser.parseString(data, function(err, result) {

	    	        articles = result.file.article;
                    tempTempArticle = articles[0];
	    	    });    	    	
    	    }
    	    
    	    res.send(articles);
    	});

    }
  
});

/* app.get('/sampleJSON', function(req, res) {


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

*/

var massageArticleForExport = function (inArticle) {

	var outArticle = {};

	outArticle.tags = inArticle.tags;
	outArticle.rating = inArticle.rating;
	outArticle.summary = inArticle.summary;
	outArticle.from = inArticle.from;

	var utils = require('./app/js/common/utils.js');

	outArticle.content = utils.getStructure(inArticle.content[0]);
	outArticle.annotation = utils.getStructure(inArticle.annotation[0]);
	
	return outArticle;

};

// spin up server
// app.listen(3000, '0.0.0.0')
app.listen(process.env.VCAP_APP_PORT || 3000); // VCAP for bluemix compatibility
