// rendering html files in browser using node js express server
// found the way to do it from - 
// http://stackoverflow.com/a/13476388/512126 (http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express)

// will use this server to learn jQuery

var express = require('express');
var app = express();

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/jquery'));

app.get('/', function(req, res) {
    res.render('index.html');
});

// spin up server
app.listen(3000, '127.0.0.1')