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
        return [
            {
                state: 'rb',
                config: {
                    url: '/rb',
                    templateUrl: 'app/rb/rb.html',
                    controller: 'RBController',
                    controllerAs: 'vm',
                    title: 'RB',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> RB'
                    }
                }
            }
        ];
    }
})();
