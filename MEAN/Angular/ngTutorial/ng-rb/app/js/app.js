var rbApp = angular.module('rbApp', ['ngRoute', 'rbAppControllers', 'rbAppServices', 'mobile-angular-ui']);

rbApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index/:indexId', {
        templateUrl: 'partials/articles-list.html',
        controller: 'articleListController as y'
      }).when('/article/:articleId', {
        templateUrl: 'partials/article-details.html',
        controller: 'articleDetailsController'
      }).when('/metadata', {
        templateUrl: 'partials/metadata.html',
        controller: 'metaDataController'
      }).
      otherwise({
        redirectTo: '/index/0'
      });
  }]);