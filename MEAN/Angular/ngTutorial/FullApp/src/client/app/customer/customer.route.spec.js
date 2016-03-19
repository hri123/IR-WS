/* jshint -W117, -W030 */
describe('customer routes', function () {
    describe('state', function () {
        var view = 'app/customer/customer.html';

        beforeEach(function() {
            module('app.customer', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state customer to url /customer ', function() {
            expect($state.href('customer', {})).to.equal('/customer');
        });

        it('should map /customer route to customer View template', function () {
            expect($state.get('customer').templateUrl).to.equal(view);
        });

        it('of customer should work with $state.go', function () {
            $state.go('customer');
            $rootScope.$apply();
            expect($state.is('customer'));
        });
    });
});
