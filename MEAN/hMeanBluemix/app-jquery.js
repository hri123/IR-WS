// rendering html files in browser using node js express server
// found the way to do it from - 
// http://stackoverflow.com/a/13476388/512126 (http://stackoverflow.com/questions/4529586/render-basic-html-view-in-node-js-express)

// will use this server to learn jQuery

var express = require('express');
var app = express();

app.set("view options", {
  layout: false
});
app.use('/', express.static(__dirname + '/jquery'));

app.get('/sampleJson', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.sendfile('./jquery/json/fromJsonGenerator.json');
});

var fs = require('fs');
app.get('/24-Load', function(req, res) {

  fs.readFile(__dirname + "/jquery/fs/data.txt", function(err, data) {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });

  
});

app.post('/24-Save', function(req, res) {

  var body = '';
  req.on('data', function(chunk) {
    console.log("Received body data: " + chunk.toString());

    body += chunk;

  });

  req.on('end', function() {

    var qs = require('querystring');
    var postdata = qs.parse(body);
    console.log(postdata);

    var contentVal = postdata.content;

    fs.writeFile(__dirname + "/jquery/fs/data.txt", contentVal, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });

    // empty 200 OK response for now
    res.writeHead(200, "OK", {
      'Content-Type': 'text/html'
    });
    res.write('24-Save done!'); // response.send(msg) is equal to response.write(msg);response.end();
    res.end();
  });


});


// spin up server
app.listen(3000, '127.0.0.1')
