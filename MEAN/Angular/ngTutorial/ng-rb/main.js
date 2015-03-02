// http://stackoverflow.com/questions/1911015/how-to-debug-node-js-applications

var express = require('express');
var app = express();

var server = require('http').Server(app); // for socket.io, this is how it needs to be used

var io = require('socket.io')(server);

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
var socketsGlobal = {};

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
    app.set("view options", {
        layout: false
    });
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

app.get('/', ensureAuthenticated, function(req, res) {
    res.sendfile(__dirname + '/app' + '/' + 'index.html');
});

app.get('/select', ensureAuthenticated, function(req, res) {
    res.sendfile(__dirname + '/app' + '/' + 'select.html');
});

app.get('/login', function(req, res) {
    res.sendfile(__dirname + '/app' + '/' + 'login.html');
});

app.get('/auth/dropbox',
    passport.authenticate('dropbox-oauth2'),
    function(req, res) {});

// Error : Invalid redirect_uri: "http://localhost:3000/auth/dropbox/callback" (https://ng-rb.mybluemix.net/auth/dropbox/callback).
// for OAuth2, the above URL needs to be registered with the app in dropbox app configuration page under OAuth2 - Redirect URIs

app.get('/auth/dropbox/callback',
    passport.authenticate('dropbox-oauth2', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/select');
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

var rbFileNames = ['01-F.xml', '02-B.xml', '03-B.xml'];

var Dropbox = require("dropbox");

var articleSaveAndUpdate = function(req, res, isNew) {

    var client = new Dropbox.Client({
        key: config.dropbox.clientID,
        secret: config.dropbox.clientSecret,
        token: accessTokenGlobal['id_' + req.user.id],
        sandbox: false
    });

    if (client.isAuthenticated()) {

        var selectedArea = req.query.area;
        var selectedProject = req.query.project;

        var fileName = "";
        var articleToSave = JSON.parse(JSON.stringify(req.body));
        if (isNew) {
            fileName = shortId.generate() + ".json";
            articleToSave.fileName = fileName;
        } else {
            fileName = req.params.fileName;
        }

        var subProjectName = "unknown";
        var endIndexOfFirstTag = articleToSave.tags.indexOf(",");
        if (endIndexOfFirstTag > 0) { // has tags
            subProjectName = articleToSave.tags.substr(0, endIndexOfFirstTag);
        } else if (articleToSave.tags.length > 0) { // has only one tag, no ","
            subProjectName = articleToSave.tags;
        }

        var writeFilePath = "/" + selectedArea + "/" + selectedProject + "/" + subProjectName + "/" + fileName;
        var fileString = JSON.stringify(articleToSave);
        client.writeFile(writeFilePath,
            fileString, {},
            function(error) {
                if (error) {
                    console.log("error during write file: " + error); // Something went wrong.
                    res.send(500);                            
                }
            });

        res.send(articleToSave);

    } else {
        console.log('dropbox client is not authenticated'); // Something went wrong.
        res.send(500);
    }

}

app.put('/api/articles/:fileName', ensureAuthenticated, function(req, res) {

    articleSaveAndUpdate(req, res, false);

});

app.post('/api/articles', ensureAuthenticated, function(req, res) {

    articleSaveAndUpdate(req, res, true);

});

app.get('/api/articles', ensureAuthenticated, function(req, res) {

    // TODO: make sure the user cannot send a different user's userid in the request, i.e, the req.user.id must not be tampered with
    var client = new Dropbox.Client({
        key: config.dropbox.clientID,
        secret: config.dropbox.clientSecret,
        token: accessTokenGlobal['id_' + req.user.id],
        sandbox: false
    });

    myDropboxUtils.resetProjectAreas(client, myDropboxUtils.projectAreas);

    if (client.isAuthenticated()) {

        var selectedArea = req.query.area;
        var selectedProject = req.query.project;
        var socket_id = req.query.socket_id;
        var socket = socketsGlobal[socket_id];

        client.readdir("/" + selectedArea + "/" + selectedProject, function(error, entries, stat) {
            if (error) {
                console.log("error during readdir: " + error); // Something went wrong.
                res.send(500);
            } else {
                // console.log("Your Dropbox contains " + entries);

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
                                    client.readFile(dirName + '/' + sub_entries[j], function(error, data, stat) { // data has the file's contents
                                        if (error) {
                                            console.log("error during readFile:" + error); // Something went wrong.
                                            res.send(500);
                                        } else {
                                            var article = JSON.parse(data);
                                            article.fileName = stat.name;

                                            socket.emit('receive_article', article);

                                            // the articles were sent once everything was loaded from dropbox, which used to give a slow response feeling to the user
                                            // so, using websockets to return the articles as soon as it is read from dropbox
                                            // if the datastore was a nosql database, may be this could have been used
                                            // articles.push(article);
                                            // totalNumOfFiles -= 1;
                                            // // res.send should be after loading all the files
                                            // if (totalNumOfFiles == 0) {
                                            //     res.send(articles);
                                            // }
                                        }
                                    });
                                }
                            }
                        });
                    })(dirName);
                }
                res.send([]); // empty reponse is sent for the get all, which return immediately and then the web sockets take over and return the articles one by one, as and when they get loaded
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
        sandbox: false
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

var massageArticleForExport = function(inArticle) {

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

// TODO: should we close the connection once done ?
// TODO: security make sure the socket.emit here does not send the articles to a different user
io.on('connection', function (socket) {
  socketsGlobal[socket.id] = socket;
  socket.emit('connect_success', { socket_id: socket.id });
});



// spin up server
// app.listen(3000, '0.0.0.0')
// app.listen(process.env.VCAP_APP_PORT || 3000); // VCAP for bluemix compatibility

server.listen(process.env.VCAP_APP_PORT || 3000); // for socket.io, this is how it needs to be used
