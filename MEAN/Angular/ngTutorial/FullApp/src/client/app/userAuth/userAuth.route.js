(function(jQuery) {
    'use strict';

    angular
        .module('app.userAuth')
        .run(appRun);

    appRun.$inject = ['routerHelper', '$rootScope', '$location', '$http'];
    /* @ngInject */
    function appRun(routerHelper, $rootScope, $location, $http) {
        routerHelper.configureStates(getStates());

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
           // redirect to login page if not logged in and trying to access a restricted page
           var restrictedPage = jQuery.inArray($location.path(), ['/login', '/register']) === -1;

           var loggedIn = false;
           if ($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.token) {

             if ($rootScope.globals.currentUser.token != '') {
               loggedIn = true;
             }
           }

           if (restrictedPage && !loggedIn) {
               $location.path('/login');
           }
       });
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/userAuth/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'login'
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'app/userAuth/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm',
                    title: 'login'
                }
            }
        ];
    }
})(jQuery);
