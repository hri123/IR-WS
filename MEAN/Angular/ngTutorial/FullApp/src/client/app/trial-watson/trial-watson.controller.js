(function () {
    'use strict';

    angular
        .module('app.trial-watson')
        .controller('TrialWatsonController', TrialWatsonController);

    TrialWatsonController.$inject = ['logger'];
    /* @ngInject */
    function TrialWatsonController(logger) {
        var vm = this;
        vm.title = 'TrialWatson';

        activate();

        function activate() {
            logger.info('Activated TrialWatson View');
        }
    }
})();
