/*jshint node:true*/
'use strict';


var express = require('express');
var app = express();
app.io = require('socket.io')(); // setting io to app so that it can be used inside 'route' files
var http = require('http');
var server = http.createServer(app); // for socket.io, this is how it needs to be used
// ALSO instead of usual 'app.listen(port,' 'server.listen(port,' needs to be used
app.io.attach(server);



// Cross Origin Support
// http://stackoverflow.com/a/21622564
var cors = require('cors');

app.use(cors());

// http://stackoverflow.com/a/7069902/512126
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8100'); // passing * instead of the absolute value may not work
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
}
app.use(allowCrossDomain);



var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 3000;
var four0four = require('./utils/404')();

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));


//
app.use('/api', require('./routes/userAuth')); // this MUST be first

app.use('/api', require('./routes/people'));
app.use('/api', require('./routes/customer'));

// requiring express in each file will return the same instance. http://nodejs.org/docs/latest/api/modules.html#modules_caching
app.use('/api', require('./routes/rb/rb')(app)); // passing app so that it can be accessed inside 'route' files

app.use('/api', require('./routes/lastRouter')); // this MUST be last


console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}


// spin up server
// app.listen(3000, '0.0.0.0')
// app.listen(process.env.VCAP_APP_PORT || 3000); // VCAP for bluemix compatibility

// app.listen(port, function() {
server.listen(port, function() { // for socket.io, this is how it needs to be used
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});
