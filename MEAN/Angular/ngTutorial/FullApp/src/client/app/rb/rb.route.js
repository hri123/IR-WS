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

    // having nested views with articleListController in the parent makes sure that the controller is not reloaded when the views get changed
    function getStates() {
        return [{
            state: 'rb',
            config: {
              abstract: true,
              template: "<div ui-view='rb'></div>",
              controller: 'articleListController',
            }
        },{
            state: 'rb.list',
            config: {
                views: {
                    'rb': {
                      templateUrl: 'app/rb/views/articles-list.html',

                      controllerAs: 'vm'

                    }
                },
                url: '/rblist',
                title: 'RB',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-lock"></i> RB'
                }
            }
        }, {
            state: 'rb.details',
            config: {
                views: {
                    'rb': {
                      templateUrl: 'app/rb/views/article-details.html',
                      controller: 'articleDetailsController',
                      controllerAs: 'vm'
                    }
                },
                url: '/rb-details',
                title: 'RB-Details',
            }
        }, {
            state: 'rb.metadata',
            config: {
                views: {
                    'rb': {
                      templateUrl: 'app/rb/views/metadata.html',
                      controller: 'metaDataController',
                      controllerAs: 'vm',
                    }
                },
                url: '/rb-metadata',
                title: 'RB-Metadata',
            }
        }, {
            state: 'rb.filters',
            config: {
                views: {
                    'rb': {
                      templateUrl: 'app/rb/views/sidebar.html',
                      controller: 'articleFiltersController',
                      controllerAs: 'vm',
                    }
                },
                url: '/rb-filters',
                title: 'RB-Filters',
            }
        }, {
            state: 'rb.select',
            config: {
                views: {
                    'rb': {
                      templateUrl: 'app/rb/views/select.html'
                    }
                },
                url: '/rb-select',
                title: 'RB-Select',
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
