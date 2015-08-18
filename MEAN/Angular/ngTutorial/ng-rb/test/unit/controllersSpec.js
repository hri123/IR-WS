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

  // idea from https://github.com/hackify/hackify-server/blob/master/test/controllers.test.js
  var sockMock = function($rootScope){
    this.events = {};
    this.emits = {};

    // intercept 'on' calls and capture the callbacks
    this.on = function(eventName, callback){
      if(!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(callback);
    };

    // intercept 'emit' calls from the client and record them to assert against in the test
    this.emit = function(eventName){
      var args = Array.prototype.slice.call(arguments, 1);

      if(!this.emits[eventName])
        this.emits[eventName] = [];
      this.emits[eventName].push(args);
    };

    //simulate an inbound message to the socket from the server (only called from the test)
    this.receive = function(eventName){
      var args = Array.prototype.slice.call(arguments, 1);

      if(this.events[eventName]){
        angular.forEach(this.events[eventName], function(callback){
          // apply is already used in controllers.js, not necessary here
          // $rootScope.$apply(function() { // Error: [$rootScope:inprog] $apply already in progress
            callback.apply(this, args);
          // });
        });
      };
    };

  };


  describe('articleListController', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('sampleJSON?index=').
          respond([{"summary": ["test summary"], "from": ["test from"], "tags": ["test-tag1, test-tag2"], "rating": ["*****"], "content": [{"_": "main content"}], "annotation": [{"_": "main annotation"}]}]);

      scope = $rootScope.$new();
      sockMock = new sockMock($rootScope);

      var socketIOMock = {
        socket: sockMock,
        connect: function() {}
      };

      // http://stackoverflow.com/questions/24122058/angular-test-a-controller-that-use-routeparams
      ctrl = $controller('articleListController', {
        $scope: scope, 
        $routeParams: {
          area: 'attitude', project: 'rb'
        },
        socketIO: socketIOMock
      });
    }));


    it('should create "articles" model with 1 article fetched from xhr', function() {
      // expect(scope.articles).toEqualData([]);
      // $httpBackend.flush();

      sockMock.receive('receive_article', {"index": 0, "summary": "test summary", "from": "test from", "tags": "test-tag1, test-tag2", "rating": "*****", "content": {"main": "main content"}, "annotation": {"main": "main annotation"}});

      expect(scope.articles).toEqualData(
          [{"index": 0, "summary": "test summary", "from": "test from", "tags": "test-tag1, test-tag2", "rating": "*****", "content": {"main": "main content"}, "annotation": {"main": "main annotation"}}]);
    });

  });

});
