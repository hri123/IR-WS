var rbApp = angular.module('rbApp', ['ngRoute', 'rbAppControllers', 'rbAppServices', 'mobile-angular-ui']);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 

rbApp.config(['$routeProvider', function($routeProvider) { $routeProvider.
  when('/index/:indexId', { templateUrl: 'partials/articles-list.html', controller: 'articleListController', reloadOnSearch: false }).
  when('/article/:articleId', { templateUrl: 'partials/article-details.html', controller: 'articleDetailsController', reloadOnSearch: false }).
  when('/metadata', { templateUrl: 'partials/metadata.html', controller: 'metaDataController', reloadOnSearch: false }).
  otherwise({ redirectTo: '/index/0' });
}]);