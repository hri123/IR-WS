var rbAppServices = angular.module('rbAppServices', ['ngResource']);

rbAppServices.service('sharedArticles', function() {
    return {};
});

// https://docs.angularjs.org/api/ngResource/service/$resource
// rbAppServices.factory('rbFiles', ['$resource', function($resource) {
// 	return $resource('sampleJSON?index=:fileIndex', {}, {
//       query: {method:'GET', params:{fileIndex:0}, isArray:true}
//     });
// }]);

rbAppServices.factory('rbFiles', ['$resource', function($resource) {
    return $resource('/api/articles/:id', {area: 'attitude', project: 'rb'}, {
        query: {
            method: 'GET',
            params: {},
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
