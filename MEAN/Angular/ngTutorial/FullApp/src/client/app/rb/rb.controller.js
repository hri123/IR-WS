(function() {
    'use strict';

    angular.module('app.rb').controller('RBController', RBController);

    RBController.$inject = ['logger'];
    /* @ngInject */
    function RBController(logger) {
        var vm = this;
        vm.title = 'RB';

        activate();

        function activate() {
            logger.info('Activated RB View');
        }
    }

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


    // sharing variables between sidebar and the main body
    angular.module('app.rb').controller('articleFiltersController', ['$scope', '$http', '$state', '$stateParams', 'sharedVars', '$location', 'rbFiles', function($scope, $http, $state, $stateParams, sharedVars, $location, rbFiles) {

        $scope.articles = sharedVars.articles;

        $scope.sharedVars = sharedVars;

        // for the Search All
        $scope.searchAll = {
            val: ''
        };

        $scope.goBack = function() {

          $state.transitionTo('rb.list');

        };

        $scope.displayRefineBy = function() {

            if ($scope.searchAll.val.trim() == "") {
                alert('Empty Search String');
                return;
            }

            $scope.searchAllCheckboxGroup = [];
            $scope.articleTags = {
                'name': 'Article Tags',
                'model': false,
                'count': 0
            };
            $scope.articleSummary = {
                'name': 'Article Summary',
                'model': false,
                'count': 0
            };
            $scope.articleContentMain = {
                'name': 'Article Content Main',
                'model': false,
                'count': 0
            };
            $scope.articleContentSectionTags = {
                'name': 'Art. Con. Sec. Tags',
                'model': false,
                'count': 0
            };
            $scope.articleContentSectionName = {
                'name': 'Art. Con. Sec. Name',
                'model': false,
                'count': 0
            };
            $scope.articleContentSectionMain = {
                'name': 'Art. Con. Sec. Main',
                'model': false,
                'count': 0
            };
            $scope.articleContentSubSectionTags = {
                'name': 'Art. Con. SubSec. Tags',
                'model': false,
                'count': 0
            };
            $scope.articleContentSubSectionName = {
                'name': 'Art. Con. SubSec. Name',
                'model': false,
                'count': 0
            };
            $scope.articleContentSubSectionMain = {
                'name': 'Art. Con. SubSec. Main',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationMain = {
                'name': 'Article Annotation Main',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationSectionTags = {
                'name': 'Art. Ann. Sec. Tags',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationSectionName = {
                'name': 'Art. Ann. Sec. Name',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationSectionMain = {
                'name': 'Art. Ann. Sec. Main',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationSubSectionTags = {
                'name': 'Art. Ann. SubSec. Tags',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationSubSectionName = {
                'name': 'Art. Ann. SubSec. Name',
                'model': false,
                'count': 0
            };
            $scope.articleAnnotationSubSectionMain = {
                'name': 'Art. Ann. SubSec. Main',
                'model': false,
                'count': 0
            };

            var articlesLength = sharedVars.articles.length;

            for (var i = 0; i < articlesLength; i++) {

                var currentArticle = sharedVars.articles[i];

                findInStringForSearchAll(currentArticle.tags, $scope.articleTags);
                findInStringForSearchAll(currentArticle.summary, $scope.articleSummary);
                findInStringForSearchAll(currentArticle.content.main, $scope.articleContentMain);
                findInStringForSearchAll(currentArticle.annotation.main, $scope.articleAnnotationMain);

                if (currentArticle.content.section) jQuery.each(currentArticle.content.section, function(index, section) {
                    findInStringForSearchAll(section.tags, $scope.articleContentSectionTags);
                    findInStringForSearchAll(section.name, $scope.articleContentSectionName);
                    findInStringForSearchAll(section.main, $scope.articleContentSectionMain);
                    if (section.sub_section) jQuery.each(section.sub_section, function(index, sub_section) {
                        findInStringForSearchAll(sub_section.tags, $scope.articleContentSubSectionTags);
                        findInStringForSearchAll(sub_section.name, $scope.articleContentSubSectionName);
                        findInStringForSearchAll(sub_section.main, $scope.articleContentSubSectionMain);

                    });
                });

                if (currentArticle.annotation.section) jQuery.each(currentArticle.annotation.section, function(index, section) {
                    findInStringForSearchAll(section.tags, $scope.articleAnnotationSectionTags);
                    findInStringForSearchAll(section.name, $scope.articleAnnotationSectionName);
                    findInStringForSearchAll(section.main, $scope.articleAnnotationSectionMain);
                    if (section.sub_section) jQuery.each(section.sub_section, function(index, sub_section) {
                        findInStringForSearchAll(sub_section.tags, $scope.articleAnnotationSubSectionTags);
                        findInStringForSearchAll(sub_section.name, $scope.articleAnnotationSubSectionName);
                        findInStringForSearchAll(sub_section.main, $scope.articleAnnotationSubSectionMain);

                    });
                });

            }

            $scope.searchAllCheckboxGroup.push($scope.articleTags);
            $scope.searchAllCheckboxGroup.push($scope.articleSummary);
            $scope.searchAllCheckboxGroup.push($scope.articleContentMain);
            $scope.searchAllCheckboxGroup.push($scope.articleContentSectionTags);
            $scope.searchAllCheckboxGroup.push($scope.articleContentSectionName);
            $scope.searchAllCheckboxGroup.push($scope.articleContentSectionMain);
            $scope.searchAllCheckboxGroup.push($scope.articleContentSubSectionTags);
            $scope.searchAllCheckboxGroup.push($scope.articleContentSubSectionName);
            $scope.searchAllCheckboxGroup.push($scope.articleContentSubSectionMain);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationMain);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationSectionTags);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationSectionName);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationSectionMain);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationSubSectionTags);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationSubSectionName);
            $scope.searchAllCheckboxGroup.push($scope.articleAnnotationSubSectionMain);
        };

        var findInStringForSearchAll = function(inputString, tracker) {
            if (inputString && inputString.toLowerCase().indexOf($scope.searchAll.val.trim()) != -1) {

                tracker.count++;

            }
        };

        var setSearchValAfterRefinedBy = function(tracker) {
            var returnVal = '';
            if (tracker.count > 0 && tracker.model == true) {
                returnVal = $scope.searchAll.val;
            }
            return returnVal;
        };

        $scope.changeRefineBy = function() {

            $scope.sharedVars.search1.tags = setSearchValAfterRefinedBy($scope.articleTags);
            $scope.sharedVars.search4.summary = setSearchValAfterRefinedBy($scope.articleSummary);
            $scope.sharedVars.search5.content.main = setSearchValAfterRefinedBy($scope.articleContentMain);
            $scope.sharedVars.search6.annotation.main = setSearchValAfterRefinedBy($scope.articleAnnotationMain);

            $scope.sharedVars.search7.val = '';
            var x = '';
            if ((x = setSearchValAfterRefinedBy($scope.articleContentSectionName)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleContentSectionMain)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleContentSubSectionName)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleContentSubSectionMain)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleAnnotationSectionName)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleAnnotationSectionMain)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleAnnotationSubSectionName)) != '') $scope.sharedVars.search7.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleAnnotationSubSectionMain)) != '') $scope.sharedVars.search7.val = x;

            $scope.sharedVars.search9.val = '';
            if ((x = setSearchValAfterRefinedBy($scope.articleContentSectionTags)) != '') $scope.sharedVars.search9.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleContentSubSectionTags)) != '') $scope.sharedVars.search9.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleAnnotationSectionTags)) != '') $scope.sharedVars.search9.val = x;
            if ((x = setSearchValAfterRefinedBy($scope.articleAnnotationSubSectionTags)) != '') $scope.sharedVars.search9.val = x;
        };

        // http://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-accordion.php
        // expanding / collapsing via data attributes caused the controller to be called again, so using the javascript call directly
        $scope.accordianCollapse = function(panelID) {
            jQuery(panelID).collapse('toggle');
        };

        // filteredOuter is required, else does not work in global scope
        $scope.filteredOuter = {
            filtered: []
        };

        $scope.isLast = function(check) {
            var cssClass = check ? 'active' : null;
            return cssClass;
        };

        $scope.addToSelectedTags = function(selectedTag) {

            if (jQuery.inArray(selectedTag, $scope.sharedVars.selectedTags) == -1) {
                $scope.sharedVars.selectedTags.push(selectedTag);
                $scope.filterArticleTags();
            }
        };

        $scope.removeFromSelectedTags = function(selectedTag) {
            $scope.sharedVars.selectedTags.splice($scope.sharedVars.selectedTags.indexOf(selectedTag), 1);
            $scope.filterArticleTags();
        };

        $scope.sharedVars.selectedTags = [];
        $scope.filteredTags = {};
        $scope.filterArticleTags = function() {

            // reinitialize
            $scope.filteredTags = {};

            var articlesLength = sharedVars.articles.length;
            for (var i = 0; i < articlesLength; i++) {

                var currentArticle = sharedVars.articles[i];
                var isApplicable = true;

                if (currentArticle.tags) {

                    var selectedTagsLength = $scope.sharedVars.selectedTags.length;
                    if ($scope.sharedVars.selectedTags.length != 0) {

                        for (var j = 0; j < selectedTagsLength; j++) {
                            var selectedTag = $scope.sharedVars.selectedTags[j];
                            if (currentArticle.tags.indexOf(selectedTag) == -1) {
                                isApplicable = false;
                                break;
                            }
                        }
                    }

                    if (isApplicable) {

                        sharedVars.processArrayOfTags(currentArticle.tags, $scope.filteredTags);

                    }

                }
            }
        };

    }]);

    // http://stackoverflow.com/a/35662649/512126 - ui-router -> $routeParams; angular-ui-router -> $stateParams
    angular.module('app.rb').controller('articleListController', ['$scope', '$http', '$location', '$state', '$stateParams', 'sharedVars', 'rbFiles', 'socketIO', 'logger', function($scope, $http, $location, $state, $stateParams, sharedVars, rbFiles, socketIO, logger) {

        activate();

        function activate() {
            logger.info('Activated RB View');
        }

        $scope.sharedVars = sharedVars;

        sharedVars.processArrayOfTags = function(value, tagCountArray) {

            var tagArr = value.split(",");

            for (var j = 0; j < tagArr.length; j++) {
                var tag = tagArr[j].trim();
                if (tagCountArray[tag]) {
                    tagCountArray[tag].value++;
                } else {
                    tagCountArray[tag] = {};
                    tagCountArray[tag].value = 1;
                    tagCountArray[tag].name = tag;
                }
            }

        };

        // this method was called twice - http://stackoverflow.com/a/24519817/512126 - in index.html
        // <div ng-include="'partials/sidebar.html'"
        //     ui-track-as-search-param='true'
        //     class="sidebar sidebar-left" ng-controller='articleListController'></div>

        $scope.articles = sharedVars.articles;

        // empty the array
        while (sharedVars.articles.length > 0) {
            sharedVars.articles.pop();
        }



        // one way to load the articles is the regular way - make a get call to the server, where the server
        // reads the article files one by one from dropbox, and after all the articles are read, returns the array
        // as the payload in one shot. The disadvantage with this approach is that the client needs to wait until
        // all the articles are loaded from dropbox, which might be a lot of time.

        // searching over the internet to find a solution for this problem - possibly to send articles back
        // to the client as and when an article is read from dropbox and updating the UI with whatever articles have
        // been read - which kinda gives an impression that it is not slow

        // possible solutions - long polling, ajax looping, web sockets, Server send events
        // *****http://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet
        // http://www.quora.com/How-do-I-implement-Angular-JS-three-way-data-binding-without-Firebase-and-just-using-Spring-Hibernate-stack
        // http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
        // http://www.smartjava.org/content/html5-server-sent-events-angularjs-nodejs-and-expressjs
        // http://www.html5rocks.com/en/tutorials/eventsource/basics/
        // http://dsheiko.com/weblog/websockets-vs-sse-vs-long-polling/
        // http://www.futureinsights.com/home/real-time-the-easy-way-with-eventsource-angularjs-and-nodejs.html
        // http://html5doctor.com/server-sent-events/#api

        // HTML5 server send events seem to the the appropriate solution for this problem as for our problem we do not require
        // a two way communication, all we need is to send data from server to client. But first, let me start solving
        // this problem with the websockets way, which is more common and eventually shift to SSE
        // Even though socket.io supports two way communication, we do not need to send anything from client as of now

        // an implementation for getting the articles - straight forward way using GET / query / $resource
        // will get articles using sockets
        // var invokeReadFile = function(param) {
        //     var data = rbFiles.query(param, function(data) {

        //         // $http.get('sampleJSON?index=' + index).success(function(data) { // use services (rbFiles.query) instead

        //         var articlesLength = data.length;
        //         for (var i = 0; i < articlesLength; i++) {

        //             var currentArticle = data[i];

        //             $scope.articles.push(currentArticle); // passing currentArticle instead of article as it has the $save, etc methods
        //         }
        //     });

        // };

        // invokeReadFile({area: $scope.projectArea, project: $scope.projectName});

        var articlesLoadUrl = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;
        socketIO.loadArticles(articlesLoadUrl, rbFiles, $scope, sharedVars);

        $scope.setCurrentArticle = function(currentArticle) {
            sharedVars.currentArticle = currentArticle;
            $location.path('/rb-details');
        };

        $scope.searchSectionOrSubSection = function(article) {

            var found = false;

            if (!$scope.sharedVars.search7 || !$scope.sharedVars.search7.val || $scope.sharedVars.search7.val == "") {
                return true;
            }

            var setFound = function(inContent) {
                var searchTerm = $scope.sharedVars.search7.val.toLowerCase();
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

        $scope.searchTagCloud = function(currentArticle) {

            var isApplicable = true;

            if (currentArticle.tags) {

                var selectedTagsLength = $scope.sharedVars.selectedTags.length;
                if ($scope.sharedVars.selectedTags.length != 0) {

                    for (var j = 0; j < selectedTagsLength; j++) {
                        var selectedTag = $scope.sharedVars.selectedTags[j];
                        if (currentArticle.tags.indexOf(selectedTag) == -1) {
                            isApplicable = false;
                            break;
                        }
                    }
                }

            }

            return isApplicable;
        };

        $scope.searchSectionOrSubSectionTags = function(article) {

            var found = false;

            if (!$scope.sharedVars.search9 || !$scope.sharedVars.search9.val || $scope.sharedVars.search9.val == "") {
                return true;
            }

            var setFound = function(inContent) {
                var searchTerm = $scope.sharedVars.search9.val.toLowerCase();
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

            if (!$scope.sharedVars.search8 || !$scope.sharedVars.search8.val || $scope.sharedVars.search8.val == "") {
                return true;
            }

            var atTagVal = $scope.sharedVars.search8.val;

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

        $scope.showMetadata = function() {

          $state.transitionTo('rb.metadata');

        };

        $scope.setFilters = function() {

          $state.transitionTo('rb.filters');

        };

        $scope.reloadArticles = function() {
          $state.go($state.current, {}, {reload: true});

        };

        $scope.selectProjectAreaAndName = function() {
          $state.transitionTo('rb.select');
        };

        $scope.OnSelectProjectAreaAndName = function(area, name) {
          $state.go('rb.list', {}, {reload: true});
        };

    }]);

    angular.module('app.rb').controller('articleDetailsController', ['$scope', '$http', '$state', '$stateParams', 'sharedVars', '$location', 'rbFiles', function($scope, $http, $state, $stateParams, sharedVars, $location, rbFiles) {

        // $scope.article = sharedVars.articles[$stateParams.articleId];
        $scope.currentArticle = sharedVars.currentArticle;


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
                    rbFiles.save({
                        area: sharedVars.projectArea,
                        project: sharedVars.projectName
                    }, $scope.currentArticle, function(savedArticle) {
                        //data saved. do something here.
                        // mixin is required to add the $update method for the next save
                        jQuery.extend(toSaveArticle, savedArticle); // mixin
                    });
                })($scope.currentArticle);

            } else { // update

                // the $update will not work after using websockets as we are using sockets to load the articles
                // previously the $resource usage would mixin the $update method to the returned articles
                // $scope.currentArticle.$update({
                // }, function() {
                //     //updated in the backend
                // });
                (function(toSaveArticle) {
                    rbFiles.update({
                        area: sharedVars.projectArea,
                        project: sharedVars.projectName
                    }, $scope.currentArticle, function(savedArticle) {
                        //data saved. do something here.
                        // mixin is required to add the $update method for the next save
                        jQuery.extend(toSaveArticle, savedArticle); // mixin
                    });
                })($scope.currentArticle);
            }

            $state.transitionTo('rb.list');

        };

        $scope.closeWithoutSaving = function () {

            // $location.path('/rb');
            $state.transitionTo('rb.list');

        };

    }]);

    angular.module('app.rb').controller('metaDataController', ['$scope', 'rbFiles', 'sharedVars', '$state', function($scope, rbFiles, sharedVars, $state) {

        $scope.keys = function(obj) {
            return obj ? Object.keys(obj) : [];
        };

        $scope.goBack = function() {

          $state.transitionTo('rb.list');

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
                sharedVars.processArrayOfTags(myArray[1], $scope.tags);
            }
        };

        var findTagsInSectionAndSubSections = function(inSectionArray) {
            if (inSectionArray) jQuery.each(inSectionArray, function(index, value) {
                addToAtTags(value.main);

                if (value.tags) {
                    $scope.sectionAndSubSectionTags.push(value.tags);
                    sharedVars.processArrayOfTags(value.tags, $scope.tags);
                }

                if (value.sub_section) jQuery.each(value.sub_section, function(index, value) {
                    addToAtTags(value.main);

                    if (value.tags) {
                        $scope.sectionAndSubSectionTags.push(value.tags);
                        sharedVars.processArrayOfTags(value.tags, $scope.tags);
                    }

                });
            });
        };

        var articlesLength = sharedVars.articles.length;
        for (var i = 0; i < articlesLength; i++) {

            var currentArticle = sharedVars.articles[i];

            if (currentArticle.tags) {

                $scope.regularTags.push(currentArticle.tags);
                sharedVars.processArrayOfTags(currentArticle.tags, $scope.tags);

            }

            var articleContent = currentArticle.content;
            var articleAnnotation = currentArticle.annotation;

            addToAtTags(articleContent.main);
            findTagsInSectionAndSubSections(articleContent.section);
            addToAtTags(articleAnnotation.main);
            findTagsInSectionAndSubSections(articleAnnotation.section);

        };

    }]);

})();
