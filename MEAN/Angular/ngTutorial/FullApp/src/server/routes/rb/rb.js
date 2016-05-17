var express = require('express');

module.exports = function(app) {
    'use strict';


    // Dropbox OAuth
    app.passport = require('passport');
    var DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

    var shortId = require('shortid');
    var path = require('path');
    var Promise = require('bluebird');


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

    // if (process.argv[2] == 'local') { // read from command line args
    //     setStorageClient('LocalFileSystem');
    // }

    var storageClient;

    function setStorageClient(clientName) {
        if (clientName == 'Dropbox') {
          storageClient = storageFactory.getStorageClient('Dropbox');
          storageClient.skipAuth = false;
        } else { // default to 'LocalFileSystem'
          storageClient = storageFactory.getStorageClient('LocalFileSystem');
          storageClient.prototype.baseDirectory = config.paths.storageClient_local_baseDirectory;
          storageClient.skipAuth = true;
        }
    }
    setStorageClient('LocalFileSystem'); // initialize


    // serialize and deserialize
    app.passport.serializeUser(function(user, done) {
        done(null, user);
    });
    app.passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    var socketsGlobal = {};
    var accessTokenGlobal = {};


    var tempCallbackURL = config_oauth.dropbox.callbackURLLocal;
    if (process.env.VCAP_APP_PORT) // if on bluemix
        tempCallbackURL = config_oauth.dropbox.callbackURLBluemix;

    // config_oauth
    app.passport.use(new DropboxStrategy({
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

    // dropbox oauth passport requires the below lines about app.use(session...)
    // without the below lines, you get the following error
    // [$resource:badcfg] Error in resource configuration for action `query`. Expected response to contain an array but got an object - on client side
    // req.isAuthenticated() on the server side returns false without the below lines
    var express_session = require('express-session');

    app.use(express_session({
        secret: 'my_precious'
    }));
    app.use(app.passport.initialize());
    app.use(app.passport.session());

    app.get('/auth/dropbox',
        app.passport.authenticate('dropbox-oauth2'),
        function(req, res) {});

    // Error : Invalid redirect_uri: "http://localhost:3000/auth/dropbox/callback" (https://ng-rb.mybluemix.net/auth/dropbox/callback).
    // for OAuth2, the above URL needs to be registered with the app in dropbox app configuration page under OAuth2 - Redirect URIs

    app.get('/auth/dropbox/callback',
        app.passport.authenticate('dropbox-oauth2', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            setStorageClient('Dropbox');
            res.redirect('/rb-select');
        });


    // test authentication
    function ensureAuthenticated(req, res, next) {
        if (storageClient.skipAuth || req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login')
    }

    var getAccessTokenFromGlobal = function(req) {
        if (storageClient.skipAuth) {
            return "";
        } else {
            return accessTokenGlobal['id_' + req.user.id];
        }
    }

    /////////

    var router = express.Router();


    // router.METHOD(path, [callback, ...] callback)
    
    // control reaches here for /api/changeStorageClient, if you do not want the /api, you need to use app.get instead of router.get
    router.get('/changeStorageClient', ensureAuthenticated, changeStorageClient);

    // REST: Query - get all
    router.get('/articles', ensureAuthenticated, getAllArticles);


    // REST: PUT - update existing
    router.put('/articles/:fileName', ensureAuthenticated, articleUpdate);

    // REST: POST - save new
    router.post('/articles', ensureAuthenticated, articleCreate);


    /////////


    var js2xmlparser = require('js2xmlparser'); // using diff module for js to xml to make sure nothing is lost during conversion

    var xml2js = require('xml2js');

    var parser = new xml2js.Parser();


    var read_json_files = function (totalNumOfFiles, client, dirName, fileName, socket_id) {
        client.readFile(dirName + '/' + fileName, function(error, data, stat) { // data has the file's contents
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
                var socket = socketsGlobal[socket_id];
                socket.emit('receive_article', article);

                totalNumOfFiles.num -= 1;
                // below actions should be after loading all the files
                if (totalNumOfFiles.num == 0) {
                    // res.send(articles);

                    // close / disconnect the connection
                    delete socketsGlobal[socket_id];
                    socket.disconnect();
                }
            }
        });
    }

    var read_subdirectories = function(totalNumOfFiles, client, dirName, socket_id) {

        // client.readdir without using Promise
        client.readdir(dirName, function(error, sub_entries) {
            if (error) {
                console.log("error during readdir: " + error); // Something went wrong.
                res.send(500);
            } else if (!sub_entries) {
                console.log("no sub-entries: " + error); // Something went wrong.
                res.send(500);
            } else {
                totalNumOfFiles.num += sub_entries.length;
                for (var j = 0; j < sub_entries.length; j++) {

                    if (sub_entries[j] == '.DS_Store') {
                        continue;
                    }

                    read_json_files(totalNumOfFiles, client, dirName, sub_entries[j], socket_id);
                }
            }
        });
    }
    
    function changeStorageClient(req, res) {
        
        var storageClient = req.query.storageClient;
        setStorageClient(storageClient);
        res.redirect('/rb-select');
    }

    function getAllArticles(req, res) {

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

            // client.readdir using Promise
            // http://bluebirdjs.com/docs/api/promise.promisify.html
            // Dropbox client requires the client object available as context in the readdir method
            var readdirAsync = Promise.promisify(client.readdir, {context: client});

            readdirAsync((client.baseDirectory || "/") + selectedArea + "/" + selectedProject)
                .then(function(entries, stat) {
                    // console.log("Your Dropbox contains " + entries);

                    var totalNumOfFiles = {num: 0};
                    var articles = [];

                    for (var i = 0; i < entries.length; i++) {
                        // TODO: if entries[i] is not a folder, continue
                        if (entries[i] == '.DS_Store') {
                            continue;
                        }


                        var dirName = (client.baseDirectory || "/") + selectedArea + "/" + selectedProject + "/" + entries[i];
                        // scope is required because the dirName would have got updated before all the files in the folder dirName are read
                        // error during readFile:Dropbox API error 404 from GET https://api-content.dropbox.com/1/files/auto/attitude/rb/sacrifice-
                        // from-others%20-%20Copy%20%289%29/Q1elgkjw.json :: {"error": "File not found"}
                        read_subdirectories(totalNumOfFiles, client, dirName, socket_id);
                    }
                    res.send([]); // empty reponse is sent for the get all, which return immediately and then the web sockets take over and return the articles one by one, as and when they get loaded
                }).catch(function(error) {
                    var errorResponse = "error during readdir: " + error + "\nLooks like there are no folder: " + selectedProject + " inside the area: " + selectedArea + ". Create a folder with the project name in dropbox or create an article here to automatically create the folder."; // Something went wrong.
                    console.log(errorResponse);
                    res.status(500).send(errorResponse);
                });

        } else {
            console.log('dropbox client is not authenticated'); // Something went wrong.
            res.send(500);
        }

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

    function articleUpdate(req, res) {

        articleSaveAndUpdate(req, res, false);

    }

    function articleCreate(req, res) {

        articleSaveAndUpdate(req, res, true);

    }



    // TODO: security testing - all possible tests / hacks to make sure one user's data cannot be accessed by another user
    // e.g.:
    // make sure the socket.emit does not send the articles to a different user
    // make sure the user cannot pass a different user's userid in the request, i.e, the req.user.id must not be tampered with
    app.io.on('connection', function (socket) {
      socketsGlobal[socket.id] = socket;
      socket.emit('connect_success', { socket_id: socket.id });
    });


    return router;


};
