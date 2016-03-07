(function() {

    var rbAppServices = angular.module('rbAppServices', ['ngResource']);

    rbAppServices.service('sharedVars', function() {
        return {
          articles: []
        };
    });

    // https://docs.angularjs.org/api/ngResource/service/$resource
    // rbAppServices.factory('rbFiles', ['$resource', function($resource) {
    // 	return $resource('sampleJSON?index=:fileIndex', {}, {
    //       query: {method:'GET', params:{fileIndex:0}, isArray:true}
    //     });
    // }]);

    rbAppServices.factory('rbFiles', ['$resource', function($resource) {
        return $resource('/api/articles/:id', {} /* params common across all methods go here */, {
            query: {
                method: 'GET',
                params: {}, /* params specific to the methods go here */
                isArray: true
            },
            save: {
                method: 'POST',
                params: {},
            },
            update: {
                method: 'PUT',
                params: {id: '@fileName'}
            }
        }, {
            stripTrailingSlashes: false
        });
    }]);


    // https://docs.angularjs.org/guide/providers
    // Extracted it outside so that it can be injected into the controller, helpful during testing (mocking)
    rbAppServices.factory('socketIO', ['$location', function socketIOFactory($location) {

        function Connection() {
            this.connect = function() {
                this.socket = io.connect($location.$$protocol + "://" + $location.$$host + ":" + $location.$$port, {'force new connection': true});
            },
            this.loadArticles = function(rbFiles, $scope) {

                // http://stackoverflow.com/a/7504015
                this.connect();
                this.socket.on('connect_success', function(data) {

                    var data = rbFiles.query({
                        area: $scope.projectArea,
                        project: $scope.projectName,
                        socket_id: data.socket_id
                    }, function(data) {
                        // nothing here, the server sends data using sockets
                    });
                });
                this.socket.on('receive_article', function(data) {

                    // $scope.apply is required to trigger the 2 way data binding of angular between model and view
                    // if this is not done, the view is not getting updated
                    // http://stackoverflow.com/questions/21658490/angular-websocket-and-rootscope-apply
                    $scope.$apply(function() {
                        $scope.articles.push(data);
                    });
                });            
            }
        }

        return new Connection();

    }]);


})();
