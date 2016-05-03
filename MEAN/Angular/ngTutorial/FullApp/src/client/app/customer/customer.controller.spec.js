/* jshint -W117, -W030 */
describe('CustomerController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.customer');
        bard.inject('$controller', '$log', '$rootScope', '$q', 'customer.dataservice');
    });

    beforeEach(function () {
        // Error: [$injector:unpr] Unknown provider: $scopeProvider <- $scope <- CustomerController
        // http://stackoverflow.com/a/34286256/512126
        sinon.stub(dataservice, 'getCustomers').returns($q.when([])); // TODO: use mockData
        scope = $rootScope.$new();
        controller = $controller('CustomerController', {$scope: scope});
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Customer controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Customer', function() {
                expect(controller.title).to.equal('Customer');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
