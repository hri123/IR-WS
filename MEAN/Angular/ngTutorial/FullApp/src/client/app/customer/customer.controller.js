(function() {
    'use strict';

    angular
        .module('app.customer')
        .controller('CustomerController', CustomerController);

    CustomerController.$inject = ['$q', 'customer.dataservice', 'logger', '$scope', '$http', '$log', '$timeout', 'uiGridConstants'];
    /* @ngInject */
    function CustomerController($q, dataservice, logger, $scope, $http, $log, $timeout, uiGridConstants) {
        var vm = this;
        vm.title = 'Customer';

        $scope.newCustomer = {
            firstname: "",
            lastname: "",
            company: "",
            email: ""
        };

        $scope.showDeleteConfirmationModal = false;
        $scope.deleteCustomersConfirm = function() {
          $scope.showDeleteConfirmationModal = !$scope.showDeleteConfirmationModal;
        }

        $scope.deleteCustomer = function() {
          var selectedRows = $scope.gridApi.selection.getSelectedRows();

          if (selectedRows.length < 1) {
            logger.error('No customers selected for deletion.');
            return;
          }

          if (selectedRows.length > 1) {
            logger.error('Multiple customer deletion not supported yet, please select only one customer at a time for deletion.');
            return;
          }

          return dataservice.deleteCustomer(selectedRows[0]).then(function() {
              getCustomers(); // reload values after creation of new customer
              logger.info('Customer deleted successfully.');
          });

        }

        $scope.showModal = false;
        $scope.toggleModal = function() {

            // reset values
            $scope.newCustomer.firstname = "";
            $scope.newCustomer.lastname = "";
            $scope.newCustomer.company = "";
            $scope.newCustomer.email = "";

            $scope.showModal = !$scope.showModal;

        };

        $scope.submit = function() {

            $scope.showModal = !$scope.showModal;

            return dataservice.createCustomer($scope.newCustomer).then(function() {
                getCustomers(); // reload values after creation of new customer
                logger.info('New customer created successfully.');
            });
        };

        $scope.sendMailObject = {
            subject: "",
            body: ""
        };

        activate();

        function activate() {
            var promises = [getCustomers()];
            return $q.all(promises).then(function() {
                logger.info('Activated Customer View');
            });
        }

        function getCustomers() {
            return dataservice.getCustomers().then(function(data) {
                $scope.gridOptions.data = data;
                $timeout(function() {
                    if ($scope.gridApi.selection.selectRow) {
                        // $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
                    }
                });

                vm.customers = data;
                return vm.customers;
            });
        }

        /////////////////////////////////
        //GRID
        /////////////////////////////////

        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };

        // TODO: http://stackoverflow.com/questions/29337672/show-button-on-ng-grid-hover - cellTemplate - cell customization
        // TODO: http://stackoverflow.com/questions/33944334/angular-ui-grid-how-to-highlight-row-on-mouseover - rowTemplate - row customization

        $scope.gridOptions.columnDefs = [{
            name: 'firstname'
        }, {
            name: 'lastname'
        }, {
            name: 'company',
            displayName: 'Company (not focusable)',
            allowCellFocus: false
        }, {
            name: 'email'
        }];

        $scope.gridOptions.multiSelect = true;

        $scope.info = {};

        $scope.toggleMultiSelect = function() {
            $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
        };

        $scope.toggleModifierKeysToMultiSelect = function() {
            $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
        };

        $scope.selectAll = function() {
            $scope.gridApi.selection.selectAllRows();
        };

        $scope.clearAll = function() {
            $scope.gridApi.selection.clearSelectedRows();
        };

        $scope.toggleRow1 = function() {
            $scope.gridApi.selection.toggleRowSelection($scope.gridOptions.data[0]);
        };

        $scope.toggleFullRowSelection = function() {
            $scope.gridOptions.enableFullRowSelection = !$scope.gridOptions.enableFullRowSelection;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
        };

        $scope.setSelectable = function() {
            $scope.gridApi.selection.clearSelectedRows();

            $scope.gridOptions.isRowSelectable = function(row) {
                if (row.entity.age > 30) {
                    return false;
                } else {
                    return true;
                }
            };
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);

            $scope.gridOptions.data[0].age = 31;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
        };

        $scope.gridOptions.onRegisterApi = function(gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                var msg = 'row selected ' + row.isSelected;
                $log.log(msg);
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
                var msg = 'rows changed ' + rows.length;
                $log.log(msg);
            });
        };

        $scope.sendMail = function() {

            var recipients = [];
            var selectedRows = $scope.gridApi.selection.getSelectedRows();

            if (selectedRows.length < 1) {
              logger.error('No customers selected for sending mail.');
              return;
            }


            var i;
            for (i = 0; i < selectedRows.length; i++) {
                recipients.push(selectedRows[i].email);
            }

            return dataservice.sendMail($scope.sendMailObject.subject, $scope.sendMailObject.body, recipients).then(function() {
                logger.info('Mail to selected customers sent successfully.');;
            });
        }
    }
})();
