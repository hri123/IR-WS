utils = require('../common/utils.js');
var mkdirp = require('mkdirp');

var massageArticleForExport = function(inArticle) {

    var outArticle = {};

    outArticle.tags = inArticle.tags[0];
    outArticle.rating = inArticle.rating[0];
    outArticle.summary = inArticle.summary[0];
    outArticle.from = inArticle.from[0];

    outArticle.content = utils.getStructure(inArticle.content[0]);
    outArticle.annotation = utils.getStructure(inArticle.annotation[0]);

    return outArticle;

};

xml2js = require('xml2js');
var parser = new xml2js.Parser();

var fs = require('fs'),
    path = require("path"),
    shortId = require('shortid');

var p = 'C:/H/H/H/HP/Dropbox/Kaizen/Hhh100204/';
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

                var articleToSave = massageArticleForExport(articles[i]);

                articleFileName = shortId.generate() + ".json";

                articleToSave.fileName = articleFileName;

                var subProjectName = "unknown";
                var endIndexOfFirstTag = articleToSave.tags.indexOf(",");
                if (endIndexOfFirstTag > 0) { // has tags
                    subProjectName = articleToSave.tags.substr(0, endIndexOfFirstTag);
                } else if (articleToSave.tags.length > 0) { // has only one tag, no ","
                    subProjectName = articleToSave.tags;
                }

                var outdir = './RB-files/attitude/rb/' + subProjectName;
    
                mkdirp(outdir, function (err) {
                    if (err) console.error(err);
                });

                // if (!fs.existsSync(outdir)) {
                //     fs.mkdirSync(outdir);
                // }

                fs.writeFile(outdir + '/' + articleFileName, JSON.stringify(articleToSave, null, 2), function(err) {
                    if (err) throw err;
                });

            }
        }
    });
});
