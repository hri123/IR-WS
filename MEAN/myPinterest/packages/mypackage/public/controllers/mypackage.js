'use strict';

angular.module('mean').controller('MypackageController', ['$scope', 'Global',
    function($scope, Global, Mypackage) {
        $scope.global = Global;
        $scope.mypackage = {
            name: 'mypackage'
        };
    }
]);
