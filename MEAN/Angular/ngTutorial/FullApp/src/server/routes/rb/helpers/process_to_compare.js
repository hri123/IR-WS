// Usage
// node ./src/server/routes/rb/helpers/process_to_compare.js

// var source_dir="/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/RB-files/attitude/rb";
// var output_dir="/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/RB-files/attitude/rb_for_compare"

// var source_dir="/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/Snapshot_160204/RB-files/attitude/rb";
// var output_dir="/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/Snapshot_160204/RB-files/attitude/rb_for_compare"

var source_dir="/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/RB-files/attitude/rb";
var output_dir="/Users/hrishikesh/H/HP/Dropbox/Kaizen/ng-rb/RB-files/attitude/rb_for_compare_orig"


utils = require('../../../../common/rb/utils.js');
var mkdirp = require('mkdirp');


xml2js = require('xml2js');
var builder = new xml2js.Builder();

var fs = require('fs'),
    path = require("path");

if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir);
}

fs.readdir(source_dir, function(err, entries) {
    if (err) {
        throw err;
    }

    for (var i = 0; i < entries.length; i++) {
        // TODO: if entries[i] is not a folder, continue
        if (entries[i] == '.DS_Store') {
            continue;
        }

        var dirName = source_dir + "/" + entries[i];

        // scope is required because the dirName would have got updated before all the files in the folder dirName are read
        // error during readFile:Dropbox API error 404 from GET https://api-content.dropbox.com/1/files/auto/attitude/rb/sacrifice-
        // from-others%20-%20Copy%20%289%29/Q1elgkjw.json :: {"error": "File not found"}
        (function(dirName, subdir) {
            fs.readdir(dirName, function(error, sub_entries) {
                if (error) {
                    console.log("error during readdir: " + error); // Something went wrong.
                } else if (!sub_entries) {
                    console.log("no sub-entries: " + error); // Something went wrong.
                } else {

                    for (var j = 0; j < sub_entries.length; j++) {

                        var data = fs.readFileSync(dirName + '/' + sub_entries[j]);

                        var json_articleToSave = JSON.parse(data);
                        // json_articleToSave = utils.convertMainFromStringToArray(json_articleToSave);
                        json_articleToSave = utils.convertMainFromArrayToString(json_articleToSave);

                        var fileString = JSON.stringify(json_articleToSave, null, 2); // pretty print - formatted print
                        if (!fs.existsSync(output_dir + '/' + subdir)) {
                            fs.mkdirSync(output_dir + '/' + subdir);
                        }
                        fs.appendFileSync(output_dir + '/' + subdir + '/' + json_articleToSave.fileName, fileString);
                    }
                }
            });
        })(dirName, entries[i]);
    }
});
