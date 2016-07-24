// DO NOT UPDATE THIS FILE INSIDE THE ION-RB DIRECTORY, this is copied from ng-rb, see bower.json

(function() {

    var rbAppServices = angular.module('rbAppServices', ['ngResource']);

    rbAppServices.service('sharedVars', function() {
        return {
          articles: [],

          search1: {
              tags: '',
          },
          search2: {
              tags: ''
          },
          search3: {
              tags: ''
          },
          search4: {
              summary: ''
          },
          search5: {
              content: {
                  main: ''
              }
          },
          search6: {
              annotation: {
                  main: ''
              }
          },
          search7: {
              val: ''
          },
          search8: {
              val: ''
          },
          search9: {
              val: ''
          },
          
          instantSearchPhrase: {
              val: ''
          },

          selectedTags: [],
          
          storageClient: "LocalFileSystem", // default value

          projectArea: 'attitude', // $stateParams.area; // picking value from the url in angular
          projectName: 'rb' // $stateParams.project;
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
            this.connect = function(url) {
                this.socket = io.connect(url, {'force new connection': true});
            },
            this.loadArticles = function(url, rbFiles, $scope, sharedVars) {

                // http://stackoverflow.com/a/7504015
                this.connect(url);
                this.socket.on('connect_success', function(data) {

                    var data = rbFiles.query({
                        area: sharedVars.projectArea,
                        project: sharedVars.projectName,
                        socket_id: data.socket_id
                    }, function(data) {
                        // nothing here, the server sends data using sockets
                    });
                });
                this.socket.on('receive_article', function(data) {

                    // $scope.apply is required to trigger the 2 way data binding of angular between model and view
                    // if this is not done, the view is not getting updated
                    // http://stackoverflow.com/questions/21658490/angular-websocket-and-rootscope-apply
                    
                    // this issue is evident when loading from Dropbox, if you are loading articles from LocalFileSystem
                    // the articles load properly even without the $apply or $digest method being called
                    
                    // http://tutorials.jenkov.com/angularjs/watch-digest-apply.html
                    // When you create a data binding from somewhere in your view to a variable on the $scope object, 
                    // AngularJS creates a "watch" internally. A watch means that AngularJS watches changes in the variable on the $scope object. 
                    // The framework is "watching" the variable. Watches are created using the $scope.$watch() function
                    
                    // In the case below the data binding is not updated, because angular framework does not call $scope.$digest() automatically
                    // as angular framework does not know that a value is changed, so, it needs to be called manually                    
                    
                    // either of the below solutions work
                    // solution 1                    
                    $scope.$apply(function() {
                        $scope.articles.push(data);
                    });
             
                    // solution 2
                    // $scope.articles.push(data);
                    // $scope.$digest();
                    

                });
            }
        }

        return new Connection();

    }]);


})();
