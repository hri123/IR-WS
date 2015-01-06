'use strict';

/* jasmine specs for controllers go here */
describe('rbApp controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('rbApp'));
  beforeEach(module('rbAppServices'));

  describe('articleListController', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('sampleJSON?index=').
          respond([{"summary": ["test summary"], "from": ["test from"], "tags": ["test-tag1, test-tag2"], "rating": ["*****"], "content": [{"_": "main content"}], "annotation": [{"_": "main annotation"}]}]);

      scope = $rootScope.$new();
      ctrl = $controller('articleListController', {$scope: scope});
    }));


    it('should create "articles" model with 1 article fetched from xhr', function() {
      expect(scope.articles).toEqualData([]);
      $httpBackend.flush();

      expect(scope.articles).toEqualData(
          [{"index": 0, "summary": "test summary", "from": "test from", "tags": "test-tag1, test-tag2", "rating": "*****", "content": {"main": "main content"}, "annotation": {"main": "main annotation"}}]);
    });

  });

});
