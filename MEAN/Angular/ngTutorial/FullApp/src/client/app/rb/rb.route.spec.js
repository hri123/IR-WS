/* jshint -W117, -W030 */
describe('rb routes', function () {
    describe('state', function () {
        var view = 'app/rb/rb.html';

        beforeEach(function() {
            module('app.rb', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state rb to url /rb ', function() {
            expect($state.href('rb', {})).to.equal('/rb');
        });

        it('should map /rb route to rb View template', function () {
            expect($state.get('rb').templateUrl).to.equal(view);
        });

        it('of rb should work with $state.go', function () {
            $state.go('rb');
            $rootScope.$apply();
            expect($state.is('rb'));
        });
    });
});
