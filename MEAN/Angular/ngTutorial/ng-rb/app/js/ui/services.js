var rbAppServices = angular.module('rbAppServices', ['ngResource']);

rbAppServices.service('sharedArticles', function () {
    return {};
});

// https://docs.angularjs.org/api/ngResource/service/$resource
rbAppServices.factory('rbFiles', ['$resource', function($resource) {
	return $resource('sampleJSON?index=:fileIndex', {}, {
      query: {method:'GET', params:{fileIndex:0}, isArray:true}
    });
}]);
