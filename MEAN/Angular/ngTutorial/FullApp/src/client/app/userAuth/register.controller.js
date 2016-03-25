(function () {
    'use strict';

    angular
        .module('app.userAuth')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'logger'];
    function RegisterController(UserService, $location, $rootScope, logger) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        logger.info('Registration successful', true);
                        $location.path('/login');
                    } else {
                        logger.info(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
