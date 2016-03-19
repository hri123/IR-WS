(function() {
    'use strict';

    angular
        .module('app.trial-watson')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'trial-watson',
                config: {
                    url: '/trial-watson',
                    templateUrl: 'app/trial-watson/trial-watson.html',
                    controller: 'TrialWatsonController',
                    controllerAs: 'vm',
                    title: 'TrialWatson',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> TrialWatson'
                    }
                }
            }
        ];
    }
})();
