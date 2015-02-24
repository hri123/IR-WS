var rbApp = angular.module('rbApp', ['ngRoute', 'rbAppControllers', 'rbAppServices', 'rbAppDirectives', 'mobile-angular-ui', 'xeditable']);

rbApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

rbApp.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return b - a;
    });
    return array;
 }
});

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 

rbApp.config(['$routeProvider', function($routeProvider) { $routeProvider.
  when('/articles', { templateUrl: 'partials/articles-list.html', controller: 'articleListController', reloadOnSearch: false }).
  when('/article/:articleId', { templateUrl: 'partials/article-details.html', controller: 'articleDetailsController', reloadOnSearch: false }).
  when('/metadata', { templateUrl: 'partials/metadata.html', controller: 'metaDataController', reloadOnSearch: false }).
  otherwise({ redirectTo: '/articles' });
}]);