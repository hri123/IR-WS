var rbApp = angular.module('rbApp', ['ngRoute', 'rbAppControllers', 'rbAppServices']);

rbApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index/:indexId', {
        templateUrl: 'partials/articles-list.html',
        controller: 'articleListController'
      }).when('/article/:articleId', {
        templateUrl: 'partials/article-details.html',
        controller: 'articleDetailsController'
      }).
      otherwise({
        redirectTo: '/index/0'
      });
  }]);