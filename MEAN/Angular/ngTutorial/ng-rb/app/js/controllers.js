var printCurrentLevel = function (prefix, obj) {
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
}

var printNesting = function (data) {

	printCurrentLevel("", data);	
}

var getStructure = function(data) {

	var returnVal = {};

	if(typeof data =='object') {
		returnVal.main = data._;
		if(data.section) {
			var sections = [];

			var sectionsLength = data.section.length;
			for (var j = 0; j < sectionsLength; j++) {

				var currentSection = data.section[j];
				
				var section = {};
				section.content = {};

				section.content.main = currentSection._;
				if (currentSection.$) {
					section.name = currentSection.$.name;
				}

				if (currentSection['sub-section']) { // hyphen is interpreted as minus in javascript, so cannot use currentSection.sub-section
					var sub_sections = [];

					var sub_sectionsLength = currentSection['sub-section'].length;

					for (var k = 0; k < sub_sectionsLength; k++) {

						var currentSubSection = currentSection['sub-section'][k];
						
						var sub_section = {};
						sub_section.content = {};

						sub_section.content.main = currentSubSection._;
						if (currentSubSection.$) {
							sub_section.name =currentSubSection.$.name;
						}

						sub_sections.push(sub_section);
					}

					section.content.sub_sections = sub_sections;

				}

				sections.push(section);
			}

			returnVal.sections = sections;

		}
	} else {
		returnVal.main = data;
	}

	return returnVal;

}

var rbAppControllers = angular.module('rbAppControllers', []);

rbAppControllers.controller('articleListController', ['$scope', '$http', '$location', '$routeParams', 'sharedArticles', 'rbFiles', function($scope, $http, $location, $routeParams, sharedArticles, rbFiles) {


	$scope.articles = [];

	var indexId = $routeParams.indexId;

	var invokeReadFile = function(param) {
		var data = rbFiles.query(param, function(data) {

		// $http.get('sampleJSON?index=' + index).success(function(data) { // use services (rbFiles.query) instead

			var articlesLength = data.length;
			for (var i = 0; i < articlesLength; i++) {

				var currentArticle = data[i];

				var article = {};

				article.tags = currentArticle.tags[0];
				article.summary = currentArticle.summary[0];
				article.rating = currentArticle.rating[0];
				article.from = currentArticle.from[0];

				article.content = getStructure(currentArticle.content[0]);
				article.annotation = getStructure(currentArticle.annotation[0]);

				article.index = $scope.articles.length;

	   			$scope.articles.push(article);
			}
			sharedArticles.articles = $scope.articles;
	  	});

	};

	if (indexId == -1) {
		for (var index = 0; index < 16; index++) {
			var param = {fileIndex: index};
			invokeReadFile(param);
		}
	} else {
		invokeReadFile({fileIndex: indexId});
	}

	$scope.searchSectionOrSubSection = function (article) {

		var found = false;

		if (!$scope.search7 || $scope.search7 == "") {
			return true;
		}

		var setFound = function (inContent) {
			var searchTerm = $scope.search7.toLowerCase();
			if (inContent && inContent.sections) jQuery.each(inContent.sections, function(index, value){

				if (value.name && value.name.toLowerCase().indexOf(searchTerm) != -1) {
					found = true;
					return false;
				}
				if (value.content) {
					if (value.content.main && value.content.main.toLowerCase().indexOf(searchTerm) != -1) {
						found = true;
						return false; // return false is equivalent to break loop
					}
					if (value.content && value.content.sub_sections) jQuery.each(value.content.sub_sections, function(index, value) {
						if (value.name && value.name.toLowerCase().indexOf(searchTerm) != -1) {
							found = true;
							return false;
						}
						if (value.content.main && value.content.main.toLowerCase().indexOf(searchTerm) != -1) {
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

	$scope.searchAtTags = function (article) {

		var found = false;

		if (!$scope.search8 || $scope.search8 == "") {
			return true;
		}

		var atTagVal = $scope.search8;

		var regExp = new RegExp("@tags\\(([^)]*)" + atTagVal, "g");

		if (regExp.exec(article.content.main) != null) {
			return true;
		} else if (regExp.exec(article.annotation.main) != null) {
			return true;
		}

		var setFound = function (inContent) {
			if (inContent && inContent.sections) jQuery.each(inContent.sections, function(index, value){

				if (value.content) {
					if (value.content.main && regExp.exec(value.content.main) != null) {
						found = true;
						return false; // return false is equivalent to break loop
					}
					if (value.content && value.content.sub_sections) jQuery.each(value.content.sub_sections, function(index, value) {
						if (value.content.main && regExp.exec(value.content.main)) {
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

}]);

rbAppControllers.controller('articleDetailsController', ['$scope', '$http', '$location', '$routeParams', 'sharedArticles', function($scope, $http, $location, $routeParams, sharedArticles) {

	$scope.article = sharedArticles.articles[$routeParams.articleId];

}]);

rbAppControllers.controller('metaDataController', ['$scope', 'rbFiles', function($scope, rbFiles) {

	$scope.keys = function(obj){
		return obj ? Object.keys(obj) : [];
	};

	$scope.tags = {};
	$scope.regularTags = [];
	$scope.atTags = [];

	var addToAtTags = function(inText) {
		var regExp = /@tags\(([^)]+)\)/g; // to extract @tags
		var myArray;
		while ((myArray = regExp.exec(inText)) !== null)
		{
			$scope.atTags.push(myArray[1]);
			processArrayOfTags(myArray[1]);
		}
	};

	var findAtTagsInSectionAndSubSections = function (inSectionArray) {
		if (inSectionArray) jQuery.each(inSectionArray, function(index, value){
			addToAtTags(value.content.main);
			if (value.content.sub_sections) jQuery.each(value.content.sub_sections, function(index, value){
				addToAtTags(value.content.main);
			});
		});
	}

	var processArrayOfTags = function (value) {

		var tagArr = value.split(",");

		for (var j = 0; j < tagArr.length; j++) {
			var tag = tagArr[j].trim();
			if ($scope.tags[tag]) {
				$scope.tags[tag]++;
			} else {
				$scope.tags[tag] = 1;
			}
		}

	};

	for (var index = 0; index < 16; index++) {

		var param = {fileIndex: index};

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
				findAtTagsInSectionAndSubSections(articleContent.sections);
				addToAtTags(articleAnnotation.main);
				findAtTagsInSectionAndSubSections(articleAnnotation.sections);

			}
	   	
	  	}));
	}

	

}]);