// Usage
// npm install
// add the path where git.exe (installed by GitHub) to environment path var
// create & update ./app/js/server/oauth.js
// node ./app/js/server/main.js local
// node ./app/js/server/main.js - for dropbox
// or can also use - npm start

// http://stackoverflow.com/questions/1911015/how-to-debug-node-js-applications
// node-debug main.js

var express = require('express');
var app = express();

var passport = require('passport');
var DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

var shortId = require('shortid');

var path = require('path');

// for the app - rBookApp (Register your application with all of the OAuth providers you want to use, except Google - as Google uses OpenID)

// Put the keys and secrets in a file called oauth.js
// var ids = {
//     dropbox: {
//         clientID: 'get_your_own',
//         clientSecret: 'get_your_own',
//         callbackURLLocal: 'http://localhost:3000/auth/dropbox/callback',
//         callbackURLBluemix: 'https://ng-rb.mybluemix.net/auth/dropbox/callback'
//     }
// }
// module.exports = ids

var config = require('./config.js');
var config_oauth = require('./oauth.js');
var myDropboxUtils = require('./dropbox.js');

var storageFactory = require('./storageFactory.js');

var skipDropboxAuth = false;
if (process.argv[2] == 'local') {
    skipDropboxAuth = true;
}

var storageClient;
if (skipDropboxAuth) { // read from command line args
    storageClient = storageFactory.getStorageClient('LocalFileSystem');
    storageClient.prototype.baseDirectory = config.paths.storageClient_local_baseDirectory;
} else {
    storageClient = storageFactory.getStorageClient();
}

// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var accessTokenGlobal = {};
var socketsGlobal = {};

var tempCallbackURL = config_oauth.dropbox.callbackURLLocal;
if (process.env.VCAP_APP_PORT) // if on bluemix
    tempCallbackURL = config_oauth.dropbox.callbackURLBluemix;

// config_oauth
passport.use(new DropboxStrategy({
        clientID: config_oauth.dropbox.clientID, // "--insert-dropbox-app-key-here--"
        clientSecret: config_oauth.dropbox.clientSecret, //"--insert-dropbox-app-secret-here--";
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

    app.use(express.static(path.resolve(config.paths.appDir)));
    // app.use('/', express.static(__dirname + '/bower_components/mobile-angular-ui')); // http://localhost:3000/demo/#/ will take you to the mobile angular ui demo on local
    app.use('/bower_components', express.static(path.resolve(config.paths.appDir + '../bower_components')));
});

app.get('/', ensureAuthenticated, function(req, res) {
    res.sendfile(path.resolve(config.paths.appDir + 'index.html')); // http://stackoverflow.com/a/14594282
});

app.get('/select', ensureAuthenticated, function(req, res) {
    res.sendfile(path.resolve(config.paths.appDir + 'select.html'));
});

app.get('/login', function(req, res) {
    res.sendfile(path.resolve(config.paths.appDir + 'login.html'));
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
    if (skipDropboxAuth || req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

var articleSaveAndUpdate = function(req, res, isNew) {

    var client = new storageClient({
        key: config_oauth.dropbox.clientID,
        secret: config_oauth.dropbox.clientSecret,
        token: getAccessTokenFromGlobal(req),
        sandbox: false
    });

    if (client.isAuthenticated()) {

        // client.getAccountInfo(function(error, accountInfo) {
        //     if (error) {
        //         console.log(error); // Something went wrong.
        //     }
        //     console.log("accountInfo: " + JSON.stringify(accountInfo));
        // });

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

        var writeFilePath = (client.baseDirectory || "/") + selectedArea + "/" + selectedProject + "/" + subProjectName + "/" + fileName;
        var fileString = JSON.stringify(articleToSave, null, 2); // pretty print - formatted print
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

// REST: PUT - update existing
app.put('/api/articles/:fileName', ensureAuthenticated, function(req, res) {

    articleSaveAndUpdate(req, res, false);

});

// REST: POST - save new
app.post('/api/articles', ensureAuthenticated, function(req, res) {

    articleSaveAndUpdate(req, res, true);

});

var getAccessTokenFromGlobal = function(req) {
    if (skipDropboxAuth) {
        return "";
    } else {
        return accessTokenGlobal['id_' + req.user.id];
    }
}

// REST: Query - get all
app.get('/api/articles', ensureAuthenticated, function(req, res) {

    var client = new storageClient({
        key: config_oauth.dropbox.clientID,
        secret: config_oauth.dropbox.clientSecret,
        token: getAccessTokenFromGlobal(req),
        sandbox: false
    });

    myDropboxUtils.resetProjectAreas(client, myDropboxUtils.projectAreas);

    // Error: Dropbox API error 401 from GET https://api11.dropbox.com/1/account/info :: {"error": "The given OAuth 2 access token doesn't exist or has expired."}
    // problem was passing OAuth1 token gotten from passport-dropbox to dropbox, then upgraded to passport-dropbox-oauth2 package
    if (client.isAuthenticated()) {

        var selectedArea = req.query.area;
        var selectedProject = req.query.project;
        var socket_id = req.query.socket_id;
        var socket = socketsGlobal[socket_id];

        client.readdir((client.baseDirectory || "/") + selectedArea + "/" + selectedProject, function(error, entries, stat) {
            if (error) {
                var errorResponse = "error during readdir: " + error + "\nLooks like there are no folder: " + selectedProject + " inside the area: " + selectedArea + ". Create a folder with the project name in dropbox or create an article here to automatically create the folder."; // Something went wrong.
                console.log(errorResponse);
                res.status(500).send(errorResponse);
            } else {
                // console.log("Your Dropbox contains " + entries);

                var totalNumOfFiles = 0;
                var articles = [];

                for (var i = 0; i < entries.length; i++) {
                    // TODO: if entries[i] is not a folder, continue
                    var dirName = (client.baseDirectory || "/") + selectedArea + "/" + selectedProject + "/" + entries[i];
                    // scope is required because the dirName would have got updated before all the files in the folder dirName are read
                    // error during readFile:Dropbox API error 404 from GET https://api-content.dropbox.com/1/files/auto/attitude/rb/sacrifice-
                    // from-others%20-%20Copy%20%289%29/Q1elgkjw.json :: {"error": "File not found"}
                    (function(dirName) {
                        client.readdir(dirName, function(error, sub_entries) {
                            if (error) {
                                console.log("error during readdir: " + error); // Something went wrong.
                                res.send(500);
                            } else if (!sub_entries) {
                                console.log("no sub-entries: " + error); // Something went wrong.
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

                                            if (!article.fileName) {
                                               article.fileName = stat.name; // this works for dropbox client, stat not available for local file system client 
                                            }

                                            // the articles were sent once everything was loaded from dropbox, which used to give a slow response feeling to the user
                                            // so, using websockets to return the articles as soon as it is read from dropbox
                                            // if the datastore was a nosql database, may be this could have been used
                                            // articles.push(article);
                                            socket.emit('receive_article', article);

                                            totalNumOfFiles -= 1;
                                            // below actions should be after loading all the files
                                            if (totalNumOfFiles == 0) {
                                                // res.send(articles);
                                                
                                                // close / disconnect the connection
                                                delete socketsGlobal[socket_id];
                                                socket.disconnect();
                                            }
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

var server = require('http').Server(app); // for socket.io, this is how it needs to be used

var io = require('socket.io')(server);
// TODO: security testing - all possible tests / hacks to make sure one user's data cannot be accessed by another user
// e.g.: 
// make sure the socket.emit does not send the articles to a different user
// make sure the user cannot pass a different user's userid in the request, i.e, the req.user.id must not be tampered with
io.on('connection', function (socket) {
  socketsGlobal[socket.id] = socket;
  socket.emit('connect_success', { socket_id: socket.id });
});

// spin up server
// app.listen(3000, '0.0.0.0')
// app.listen(process.env.VCAP_APP_PORT || 3000); // VCAP for bluemix compatibility

server.listen(process.env.VCAP_APP_PORT || 3000); // for socket.io, this is how it needs to be used
