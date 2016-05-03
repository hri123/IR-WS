(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger'];
    /* @ngInject */
    function AdminController(logger) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        /************ BIG WORD Begin *************/

        // <b>how are you </b>

        // <b>how are you </b>


        // <b>how are you </b>


        // <b>how are you </b>

        /************ BIG WORD End *************/

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
