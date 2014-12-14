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

rbAppControllers.controller('articleListController', ['$scope', '$http', '$location', '$routeParams', 'sharedArticles', function($scope, $http, $location, $routeParams, sharedArticles) {

	var index = $routeParams.indexId;

	$http.get('sampleJSON?index=' + index).success(function(data) {

		// printNesting(data); // for testing purposes only


		$scope.articles = [];

		var articlesLength = data.length;
		for (var i = 0; i < articlesLength; i++) {

			var currentArticle = data[i];

			var article = {};

			article.tags = currentArticle.tags[0];
			article.summary = currentArticle.summary[0];

			article.content = getStructure(currentArticle.content[0]);
			article.annotation = getStructure(currentArticle.annotation[0]);

   			$scope.articles.push(article);

		}

		sharedArticles.articles = $scope.articles;

    	
  	});

/*
	$scope.articles = [
		{
			tags: ["sacrifice, self-care, hurt-others"],
			summary: ["Life or death is man’s only fundamental alternative. To live is his basic act of choice"]
		}, {
			tags: ["sacrifice, self-care, hurt-others"],
			summary: ["Do not harm others and do not allow others to harm you"]
		}

	];

*/

}]);

rbAppControllers.controller('articleDetailsController', ['$scope', '$http', '$location', '$routeParams', 'sharedArticles', function($scope, $http, $location, $routeParams, sharedArticles) {

	$scope.article = sharedArticles.articles[$routeParams.articleId];

}]);
