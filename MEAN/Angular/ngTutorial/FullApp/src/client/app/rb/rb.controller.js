(function () {
    'use strict';

    angular
        .module('app.rb')
        .controller('RBController', RBController);

    RBController.$inject = ['logger'];
    /* @ngInject */
    function RBController(logger) {
        var vm = this;
        vm.title = 'RB';

        activate();

        function activate() {
            logger.info('Activated RB View');
        }
    }
})();
