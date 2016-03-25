(function () {
    'use strict';

    angular
        .module('app.userAuth')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'logger'];
    function LoginController($location, AuthenticationService, logger) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password, response.token);
                    $location.path('/');
                } else {
                    logger.error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
