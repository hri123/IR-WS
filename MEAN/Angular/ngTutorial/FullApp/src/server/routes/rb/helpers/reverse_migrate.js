// Usage
// update the line with source folder location in the code below
// var p = '/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/RB-files/attitude/rb';
// node ./src/server/routes/rb/helpers/reverse_migrate.js

utils = require('../../../../common/rb/utils.js');
var mkdirp = require('mkdirp');

var massageArticleForExport = function(inArticle) {

    return inArticle;

};

xml2js = require('xml2js');
var builder = new xml2js.Builder();

var fs = require('fs'),
    path = require("path");

if (!fs.existsSync('./RB-files-xml')) {
    fs.mkdirSync('./RB-files-xml');
}
var outdir = './RB-files-xml';

var p = '/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/RB-files/attitude/rb';
fs.readdir(p, function(err, entries) {
    if (err) {
        throw err;
    }

    for (var i = 0; i < entries.length; i++) {
        // TODO: if entries[i] is not a folder, continue
        if (entries[i] == '.DS_Store') {
            continue;
        }

        var dirName = p + "/" + entries[i];

        // scope is required because the dirName would have got updated before all the files in the folder dirName are read
        // error during readFile:Dropbox API error 404 from GET https://api-content.dropbox.com/1/files/auto/attitude/rb/sacrifice-
        // from-others%20-%20Copy%20%289%29/Q1elgkjw.json :: {"error": "File not found"}
        (function(dirName, fileName) {
            fs.readdir(dirName, function(error, sub_entries) {
                if (error) {
                    console.log("error during readdir: " + error); // Something went wrong.
                } else if (!sub_entries) {
                    console.log("no sub-entries: " + error); // Something went wrong.
                } else {

                    sub_entries.sort(function(a, b) {
                        return a < b ? -1 : 1;
                    });

                    for (var j = 0; j < sub_entries.length; j++) {

                        var data = fs.readFileSync(dirName + '/' + sub_entries[j]);

                        var json_articleToSave = JSON.parse(data);
                        json_articleToSave = massageArticleForExport(json_articleToSave);

                        var xml_articleToSave = builder.buildObject(json_articleToSave);

                        xml_articleToSave = xml_articleToSave.split('&#xD;').join('\n');
                        xml_articleToSave = xml_articleToSave.split('\<main\>').join('');
                        xml_articleToSave = xml_articleToSave.split('\<\/main\>').join('');
                        xml_articleToSave = xml_articleToSave.split('\<\/main\/\>').join('');
                        xml_articleToSave = xml_articleToSave.split('\<root\>').join('\<article\>');
                        xml_articleToSave = xml_articleToSave.split('\<\/root\>').join('\<\/article\>');
                        xml_articleToSave = xml_articleToSave.split('\<\?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"\?\>').join('');
                        xml_articleToSave = xml_articleToSave.split('&gt;').join('\>');

                        fs.appendFileSync(outdir + '/' + fileName + '.xml', xml_articleToSave);

                    }
                }
            });
        })(dirName, entries[i]);
    }
});
