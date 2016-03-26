(function() {
    'use strict';

    angular
        .module('app.customer')
        .factory('customer.dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger', '$rootScope'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger, $rootScope) {
        var service = {
            getCustomers: getCustomers,
            createCustomer: createCustomer,
            deleteCustomer: deleteCustomer,
            sendMail: sendMail
        };

        return service;

        function getToken() {

          if ($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.token) {
              return $rootScope.globals.currentUser.token;
          } else {
            return '';
          }

        }

        function getCustomers() {


          var data = {
              token: getToken()
          };

            return $http.get('/api/customers', {params: data})
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getCustomers')(e);
            }
        }

        function createCustomer(newCustomer) {

            var data = {
                firstname: newCustomer.firstname,
                lastname: newCustomer.lastname,
                company: newCustomer.company,
                email: newCustomer.email
            };

            return $http.post('/api/customer', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return "";
            }

            function fail(e) {
                return exception.catcher('XHR Failed for createCustomer')(e);
            }
        }

        function deleteCustomer(customer) {

            var data = {
                id: customer._id,
                rev: customer._rev
            };

            return $http.delete('/api/customer', {params: data})
                .then(success)
                .catch(fail);

            function success(response) {
                return "";
            }

            function fail(e) {
                return exception.catcher('XHR Failed for deleteCustomer')(e);
            }
        }

        function sendMail(_subject, _body, _customers) {

            var data = {
                subject: _subject,
                body: _body,
                recipients: _customers,
                token: getToken()

            };

            return $http.post('/api/sendmail', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return "";
            }

            function fail(e) {
                return exception.catcher('XHR Failed for sendMail')(e);
            }
        }
    }
})();
