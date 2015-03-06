utils = require('../common/utils.js');

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

fs = require('fs');

var shortId = require('shortid');

var articles = [];

var rbFileNames = ['01-First-AnalysisParalysis.xml'];

var index = 0;

var data = fs.readFileSync('H:/H/H/HP/Dropbox/Kaizen/Hhh100204/' + rbFileNames[index]);

// by default it is sync (not async)
parser.parseString(data, function(err, result) {

    articles = result.file.article;
});

var articlesLength = articles.length;
for (var i = 0; i < articlesLength; i++) {

    fs.writeFile(shortId.generate() + ".json", JSON.stringify(massageArticleForExport(articles[i])), function(err) {
        if (err) throw err;
    });

}
