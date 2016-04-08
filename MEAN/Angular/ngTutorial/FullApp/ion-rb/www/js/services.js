angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

// http://thecodebarbarian.com/2015/01/24/angularjs-interceptors
// https://strongloop.com/strongblog/part-3-ionic-loopback-frameworks-building-the-ionic-app -> section - 'Tying It All Together'

// Also the nodejs server servicing at :3000 need to add support for cross domain as
// http://stackoverflow.com/a/21622564
/*var cors = require('cors');

var express = require('express');
var app = express();
app.use(cors());*/

(function() {
  var modify_interceptor = angular.module('modify_interceptor', ['ng']);

  modify_interceptor.config(function($httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        request: function(req) {
          // Transform **all** $http calls so that requests that go to `/`
          // instead go to a different origin, in this case localhost:3000
          if (req.url.charAt(0) === '/') {
            req.url = 'http://localhost:3000' + req.url;
            // and make sure to send cookies too
            req.withCredentials = false;
          }

          return req;
        }
      };
    });
  });

})();
