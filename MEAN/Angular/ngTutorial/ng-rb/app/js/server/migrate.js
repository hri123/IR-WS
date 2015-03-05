/* 

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

var rbFileNames = ['01-F.xml', '02-B.xml', '03-B.xml'];

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

                // var article = {};

                // article.tags = currentArticle.tags[0];
                // article.summary = currentArticle.summary[0];
                // article.rating = currentArticle.rating[0];
                // article.from = currentArticle.from[0];

                // article.content = getStructure(currentArticle.content[0]);
                // article.annotation = getStructure(currentArticle.annotation[0]);

                // article.fileName = currentArticle.fileName;

                // jQuery.extend(currentArticle, article); // mixin

*/

