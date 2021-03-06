var newArticle = function() {
    this.tags = "";
    this.rating = "";
    this.summary = "";
    this.from = "";
    this.content = {
        main: "",
        section: []
    };
    this.annotation = {
        main: "",
        section: []
    };
    this.fileName = "";
};

var newSection = function() {
    this.main = "";
    this.name = "";
    this.tags = "";
    this.sub_section = [];
};

var newSubSection = function() {
    this.main = "";
    this.name = "";
    this.tags = "";
};

var getStructure = function(data) {

    var returnVal = {main:''};

    if (typeof data == 'object') {
        if (data._) {
            returnVal.main = data._;
        }
        if (data.section) {
            var sections = [];

            var sectionsLength = data.section.length;
            for (var j = 0; j < sectionsLength; j++) {

                var currentSection = data.section[j];

                var section = {};

                if (typeof currentSection == 'object') {
                    section.main = currentSection._;
                } else {
                    section.main = currentSection;
                }

                if (currentSection.$) {
                    section.name = currentSection.$.name;
                }

                if (currentSection.tags) {
                    section.tags = currentSection.tags[0];
                }

                if (currentSection['sub-section']) { // hyphen is interpreted as minus in javascript, so cannot use currentSection.sub-section
                    var temp_sub_sections = [];

                    var sub_sectionsLength = currentSection['sub-section'].length;

                    for (var k = 0; k < sub_sectionsLength; k++) {

                        var currentSubSection = currentSection['sub-section'][k];

                        var sub_section = {};

                        if (typeof currentSubSection == 'object') {
                            sub_section.main = currentSubSection._;
                        } else {
                            sub_section.main = currentSubSection;
                        }

                        if (currentSubSection.$) {
                            sub_section.name = currentSubSection.$.name;
                        }

                        if (currentSubSection.tags) {
                            sub_section.tags = currentSubSection.tags[0];
                        }

                        temp_sub_sections.push(sub_section);
                    }

                    section.sub_section = temp_sub_sections;

                }

                sections.push(section);
            }

            returnVal.section = sections;

        }
    } else {
        returnVal.main = data;
    }

    return returnVal;

};

var convertMainFromStringToArray = function(inArticle) {

    (function eachRecursive(obj) {
        for (var k in obj)
        {
            if (!obj.hasOwnProperty(k))
                continue;

            if (typeof obj[k] == "object" && obj[k] !== null)
                eachRecursive(obj[k]);
            else {
                if (typeof obj[k] == "string") {
                    if (k == "main") {
                        // obj[k] = obj[k].split("\r").join('');
                        var convertedToArray = obj[k].split("\n");
                        obj[k] = convertedToArray;
                    }
                }
            }
        }
    })(inArticle);

    return inArticle;

};

var convertMainFromArrayToString = function(inArticle) {

    (function eachRecursive(obj) {
        for (var k in obj)
        {
            if (!obj.hasOwnProperty(k))
                continue;

            if (k == "main") {
                var convertedToString = obj[k].join("\n");
                obj[k] = convertedToString;
            } else if (typeof obj[k] == "object" && obj[k] !== null)
                eachRecursive(obj[k]);
        }
    })(inArticle);

    return inArticle;

};



try {
    module.exports.getStructure = getStructure;

    module.exports.newArticle = newArticle;
    module.exports.newSection = newSection;
    module.exports.newSubSection = newSubSection;

    module.exports.convertMainFromStringToArray = convertMainFromStringToArray;
    module.exports.convertMainFromArrayToString = convertMainFromArrayToString;

} catch (err) {
    console.log('This file is shared between angular and node, ignore this error if you see it on angular side.')
}
