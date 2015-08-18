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
