(function(jQuery) {
    'use strict';

    angular
        .module('app.userAuth')
        .run(appRun);

    appRun.$inject = ['routerHelper', '$rootScope', '$location', '$http', 'logger'];
    /* @ngInject */
    function appRun(routerHelper, $rootScope, $location, $http, logger) {
        routerHelper.configureStates(getStates());

        http: //mattmetlis.blogspot.in/2013/12/angularui-router-state-and-location.html
            $rootScope.$on('$locationChangeStart', function(event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                //  console.log('location change fired');

                var restrictedPage = jQuery.inArray($location.path(), ['/login', '/register']) === -1;

                var loggedIn = false;
                if ($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.token) {

                    if ($rootScope.globals.currentUser.token != '') {
                        loggedIn = true;
                    }
                }

                if (restrictedPage && !loggedIn) {
                    logger.error("Please login first");
                    $location.path('/login');
                }
            });

        $rootScope.$on('$stateChangeStart', function(event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            // console.log('state change fired');

        });

    }

    function getStates() {
        return [{
            state: 'login',
            config: {
                url: '/login',
                templateUrl: 'app/userAuth/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                title: 'login'
            }
        }, {
            state: 'register',
            config: {
                url: '/register',
                templateUrl: 'app/userAuth/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                title: 'login'
            }
        }];
    }
})(jQuery);
