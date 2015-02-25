var printCurrentLevel = function(prefix, obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {

            var name = prefix;
            if ($.isArray(obj)) {

            } else {

                name += '.' + property;
                console.log(name);

            }

            if (typeof obj[property] === "object") {
                printCurrentLevel(name, obj[property]);
            }
        }
    }
};

var printNesting = function(data) {

    printCurrentLevel("", data);
};

var rbAppControllers = angular.module('rbAppControllers', []);

// sharing variables between sidebar and the main body
rbAppControllers.controller('mainAppController', ['$scope', function($scope) {

    $scope.search1 = {
        tags: ''
    };
    $scope.search2 = {
        tags: ''
    };
    $scope.search3 = {
        tags: ''
    };
    $scope.search4 = {
        summary: ''
    };
    $scope.search5 = {
        content: {
            main: ''
        }
    };
    $scope.search6 = {
        annotation: {
            main: ''
        }
    };
    $scope.search7 = {
        val: ''
    };
    $scope.search8 = {
        val: ''
    };
    $scope.search9 = {
        val: ''
    };

    $scope.clearInputTags = function(inputVar) {
        inputVar.tags = '';
    };

    $scope.clearInputVal = function(inputVar) {
        inputVar.val = '';
    };

}]);

rbAppControllers.controller('articleListController', ['$scope', '$http', '$location', '$routeParams', 'sharedArticles', 'rbFiles', function($scope, $http, $location, $routeParams, sharedArticles, rbFiles) {

    // this method was called twice - http://stackoverflow.com/a/24519817/512126 - in index.html
    // <div ng-include="'partials/sidebar.html'" 
    //     ui-track-as-search-param='true'
    //     class="sidebar sidebar-left" ng-controller='articleListController'></div>

    $scope.articles = [];

    $scope.projectArea = $routeParams.area; // picking value from the url in angular
    $scope.projectName = $routeParams.project;

    var invokeReadFile = function(param) {
        var data = rbFiles.query(param, function(data) {

            // $http.get('sampleJSON?index=' + index).success(function(data) { // use services (rbFiles.query) instead

            var articlesLength = data.length;
            for (var i = 0; i < articlesLength; i++) {

                var currentArticle = data[i];

                // TODO: the below conversion is required only for the xml to json conversion
                // var article = {};

                // article.tags = currentArticle.tags[0];
                // article.summary = currentArticle.summary[0];
                // article.rating = currentArticle.rating[0];
                // article.from = currentArticle.from[0];

                // article.content = getStructure(currentArticle.content[0]);
                // article.annotation = getStructure(currentArticle.annotation[0]);

                // article.fileName = currentArticle.fileName;

                // jQuery.extend(currentArticle, article); // mixin

                $scope.articles.push(currentArticle); // passing currentArticle instead of article as it has the $save, etc methods
            }
            sharedArticles.articles = $scope.articles;
        });

    };

    invokeReadFile({area: $scope.projectArea, project: $scope.projectName});

    $scope.setCurrentArticle = function(currentArticle) {
        $scope.currentArticle = currentArticle;
    };

    $scope.searchSectionOrSubSection = function(article) {

        var found = false;

        if (!$scope.search7 || !$scope.search7.val || $scope.search7.val == "") {
            return true;
        }

        var setFound = function(inContent) {
            var searchTerm = $scope.search7.val.toLowerCase();
            if (inContent && inContent.section) jQuery.each(inContent.section, function(index, value) {

                if (value.name && value.name.toLowerCase().indexOf(searchTerm) != -1) {
                    found = true;
                    return false;
                }
                if (value) {
                    if (value.main && value.main.toLowerCase().indexOf(searchTerm) != -1) {
                        found = true;
                        return false; // return false is equivalent to break loop
                    }
                    if (value && value.sub_section) jQuery.each(value.sub_section, function(index, value) {
                        if (value.name && value.name.toLowerCase().indexOf(searchTerm) != -1) {
                            found = true;
                            return false;
                        }
                        if (value.main && value.main.toLowerCase().indexOf(searchTerm) != -1) {
                            found = true;
                            return false; // return false is equivalent to break loop
                        }
                    });
                    if (found == true) return false;
                }
            });
        };

        setFound(article.content);
        if (!found) setFound(article.annotation);

        return found;

    };

    $scope.searchSectionOrSubSectionTags = function(article) {

        var found = false;

        if (!$scope.search9 || !$scope.search9.val || $scope.search9.val == "") {
            return true;
        }

        var setFound = function(inContent) {
            var searchTerm = $scope.search9.val.toLowerCase();
            if (inContent && inContent.section) jQuery.each(inContent.section, function(index, value) {

                if (value) {
                    if (value.tags && value.tags.toLowerCase().indexOf(searchTerm) != -1) {
                        found = true;
                        return false; // return false is equivalent to break loop
                    }
                    if (value && value.sub_section) jQuery.each(value.sub_section, function(index, value) {
                        if (value.tags && value.tags.toLowerCase().indexOf(searchTerm) != -1) {
                            found = true;
                            return false; // return false is equivalent to break loop
                        }
                    });
                    if (found == true) return false;
                }
            });
        };

        setFound(article.content);
        if (!found) setFound(article.annotation);

        return found;

    };

    $scope.searchAtTags = function(article) {

        var found = false;

        if (!$scope.search8 || !$scope.search8.val || $scope.search8.val == "") {
            return true;
        }

        var atTagVal = $scope.search8.val;

        var regExp = new RegExp("@tags\\(([^)]*)" + atTagVal, "g");

        if (regExp.exec(article.content.main) != null) {
            return true;
        } else if (regExp.exec(article.annotation.main) != null) {
            return true;
        }

        var setFound = function(inContent) {
            if (inContent && inContent.section) jQuery.each(inContent.section, function(index, value) {

                if (value) {
                    if (value.main && regExp.exec(value.main) != null) {
                        found = true;
                        return false; // return false is equivalent to break loop
                    }
                    if (value && value.sub_section) jQuery.each(value.sub_section, function(index, value) {
                        if (value.main && regExp.exec(value.main)) {
                            found = true;
                            return false; // return false is equivalent to break loop
                        }
                    });
                    if (found == true) return false;
                }
            });
        };

        setFound(article.content);
        if (!found) setFound(article.annotation);

        return found;

    };

    $scope.createNewArticle = function() {

        var article = new newArticle();

        $scope.articles.unshift(article);

    };

    $scope.createNewSection = function(type) {

        var section = new newSection();

        var temp = null;
        if (type == 'content') {
            temp = $scope.currentArticle.content;
        } else {
            temp = $scope.currentArticle.annotation;
        }

        if (!temp.section) {
            temp.section = [];
        }

        temp.section.unshift(section);

    };

    $scope.createNewSubSection = function(section) {

        var subSection = new newSubSection();

        if (!section.sub_section) {
            section.sub_section = [];
        }

        section.sub_section.unshift(subSection);

    };

    $scope.saveArticle = function() {

        if (!$scope.currentArticle.fileName || $scope.currentArticle.fileName == "") { // create new

        	// $scope.currentArticle.$save can be used too
        	// using two different ways to call the Rest APIs on the server for demonstration
        	(function(toSaveArticle) {
        	    rbFiles.save({area: $scope.projectArea, project: $scope.projectName}, $scope.currentArticle, function(savedArticle) {
        	        //data saved. do something here.
        	        // mixin is required to add the $update method for the next save
        	        jQuery.extend(toSaveArticle, savedArticle); // mixin
        	    });
        	})($scope.currentArticle);

        } else { // update

            $scope.currentArticle.$update({area: $scope.projectArea, project: $scope.projectName}, function() {
                //updated in the backend
            });
        }

    };


}]);

rbAppControllers.controller('articleDetailsController', ['$scope', '$http', '$location', '$routeParams', 'sharedArticles', function($scope, $http, $location, $routeParams, sharedArticles) {

    $scope.article = sharedArticles.articles[$routeParams.articleId];

}]);

rbAppControllers.controller('metaDataController', ['$scope', 'rbFiles', function($scope, rbFiles) {

    $scope.keys = function(obj) {
        return obj ? Object.keys(obj) : [];
    };

    $scope.tags = {};
    $scope.regularTags = [];
    $scope.sectionAndSubSectionTags = [];
    $scope.atTags = [];

    var addToAtTags = function(inText) {
        var regExp = /@tags\(([^)]+)\)/g; // to extract @tags
        var myArray;
        while ((myArray = regExp.exec(inText)) !== null) {
            $scope.atTags.push(myArray[1]);
            processArrayOfTags(myArray[1]);
        }
    };

    var findTagsInSectionAndSubSections = function(inSectionArray) {
        if (inSectionArray) jQuery.each(inSectionArray, function(index, value) {
            addToAtTags(value.main);

            if (value.tags) {
                $scope.sectionAndSubSectionTags.push(value.tags);
                processArrayOfTags(value.tags);
            }

            if (value.sub_section) jQuery.each(value.sub_section, function(index, value) {
                addToAtTags(value.main);

                if (value.tags) {
                    $scope.sectionAndSubSectionTags.push(value.tags);
                    processArrayOfTags(value.tags);
                }

            });
        });
    }

    var processArrayOfTags = function(value) {

        var tagArr = value.split(",");

        for (var j = 0; j < tagArr.length; j++) {
            var tag = tagArr[j].trim();
            if ($scope.tags[tag]) {
                $scope.tags[tag].value++;
            } else {
                $scope.tags[tag] = {};
                $scope.tags[tag].value = 1;
                $scope.tags[tag].name = tag;
            }
        }

    };

    for (var index = 0; index < 16; index++) {

        var param = {
            fileIndex: index
        };

        rbFiles.query(param, (function(data) {

            // printNesting(data); // for testing purposes only

            var articlesLength = data.length;
            for (var i = 0; i < articlesLength; i++) {

                var currentArticle = data[i];

                if (currentArticle.tags[0]) {

                    $scope.regularTags.push(currentArticle.tags[0]);
                    processArrayOfTags(currentArticle.tags[0]);

                }


                var articleContent = getStructure(currentArticle.content[0]);
                var articleAnnotation = getStructure(currentArticle.annotation[0]);

                addToAtTags(articleContent.main);
                findTagsInSectionAndSubSections(articleContent.section);
                addToAtTags(articleAnnotation.main);
                findTagsInSectionAndSubSections(articleAnnotation.section);

            }

        }));
    }



}]);
