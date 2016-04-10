(function() {
    'use strict';

    angular
        .module('app.rb')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'rb',
            config: {
                url: '/rb',
                templateUrl: 'app/rb/views/articles-list.html',
                controller: 'articleListController',
                controllerAs: 'vm',
                title: 'RB',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-lock"></i> RB'
                }
            }
        }, {
            state: 'rb-details',
            config: {
                url: '/rb-details',
                templateUrl: 'app/rb/views/article-details.html',
                controller: 'articleDetailsController',
                controllerAs: 'vm',
                title: 'RB-Details',
            }
        }, {
            state: 'rb-metadata',
            config: {
                url: '/rb-metadata',
                templateUrl: 'app/rb/views/metadata.html',
                controller: 'metaDataController',
                controllerAs: 'vm',
                title: 'RB-Metadata',
            }
        }, {
            state: 'rb-filters',
            config: {
                url: '/rb-filters',
                templateUrl: 'app/rb/views/sidebar.html',
                controller: 'articleFiltersController',
                controllerAs: 'vm',
                title: 'RB-Filters',
            }
        }];
    }

    angular
        .module('app.rb')
        .run(function(editableOptions, editableThemes) {
            editableThemes.bs3.inputClass = 'input-sm';
            editableThemes.bs3.buttonsClass = 'btn-sm';
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        });

    angular
        .module('app.rb')
        .filter('orderObjectBy', function() {
            return function(input, attribute) {
                if (!angular.isObject(input)) return input;

                var array = [];
                for (var objectKey in input) {
                    array.push(input[objectKey]);
                }

                array.sort(function(a, b) {
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

    // commented the legacy - copied code below as will use the routing the hot-towel way
    /*
        rbApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/articles/:area/:project', {
                templateUrl: 'partials/articles-list.html',
                controller: 'articleListController',
                reloadOnSearch: false
            }).
            when('/article/:articleId', {
                templateUrl: 'partials/article-details.html',
                controller: 'articleDetailsController',
                reloadOnSearch: false
            }).
            when('/metadata', {
                templateUrl: 'partials/metadata.html',
                controller: 'metaDataController',
                reloadOnSearch: false
            }).
            otherwise({
                redirectTo: '/articles/attitude/rb'
            });
        }]);
    */

})();
