// Usage
// update the line with source folder location in the code below
// var p = '/Users/hrishikesh/H/HP/Dropbox/Kaizen/Hhh100204';
// node ./app/js/server/migrate.js

utils = require('./common/utils.js');
var mkdirp = require('mkdirp');

var massageArticleForExport = function(inArticle, subProjectName, num) {

    var outArticle = {};

    outArticle.tags = inArticle.tags[0];
    outArticle.rating = inArticle.rating[0];
    outArticle.summary = inArticle.summary[0];
    outArticle.from = inArticle.from[0];

    outArticle.content = utils.getStructure(inArticle.content[0]);
    outArticle.annotation = utils.getStructure(inArticle.annotation[0]);

    articleFileName = subProjectName + "_" + ("0" + num).slice(-2) + ".json";
    outArticle.fileName = articleFileName;

    return outArticle;

};

xml2js = require('xml2js');
var parser = new xml2js.Parser();

var fs = require('fs'),
    path = require("path"),
    shortId = require('shortid');

var p = '/Users/hrishikesh/H/HP/Dropbox/Kaizen/Hhh100204';
fs.readdir(p, function(err, files) {
    if (err) {
        throw err;
    }

    if (!fs.existsSync('./RB-files')) {
        fs.mkdirSync('./RB-files');
        fs.mkdirSync('./RB-files/attitude');
        fs.mkdirSync('./RB-files/attitude/rb');
    }

    files.map(function(file) {
        return path.join(p, file);
    }).filter(function(file) {
        return fs.statSync(file).isFile();
    }).forEach(function(file) {
        if (path.extname(file) == ".xml") {
            var articles = [];
            console.log(file);
            var data = fs.readFileSync(file);
            // by default it is sync (not async)
            parser.parseString(data, function(err, result) {
                articles = result.file.article;
            });

            var articlesLength = articles.length;
            for (var i = 0; i < articlesLength; i++) {

                var subProjectName = "unknown";
                var endIndexOfFirstTag = articles[i].tags[0].indexOf(",");
                if (endIndexOfFirstTag > 0) { // has tags
                    subProjectName = articles[i].tags[0].substr(0, endIndexOfFirstTag);
                } else if (articles[i].tags[0].length > 0) { // has only one tag, no ","
                    subProjectName = articles[i].tags[0];
                }

                var articleToSave = massageArticleForExport(articles[i], subProjectName, i);

                var outdir = './RB-files/attitude/rb/' + subProjectName;

                mkdirp(outdir, function (err) {
                    if (err) console.error(err);
                });

                var strArticleToSave = JSON.stringify(articleToSave, null, 2);
                strArticleToSave = strArticleToSave.split("\\r").join('');

                // if (!fs.existsSync(outdir)) {
                //     fs.mkdirSync(outdir);
                // }

                fs.writeFile(outdir + '/' + articleToSave.fileName, strArticleToSave, function(err) {
                    if (err) throw err;
                });

            }
        }
    });
});
