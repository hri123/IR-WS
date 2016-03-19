(function() {
    'use strict';

    angular
        .module('app.customer')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'customer',
                config: {
                    url: '/', // '/customer',
                    templateUrl: 'app/customer/customer.html',
                    controller: 'CustomerController',
                    controllerAs: 'vm',
                    title: 'Customer',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Customer'
                    }
                }
            }
        ];
    }
})();
