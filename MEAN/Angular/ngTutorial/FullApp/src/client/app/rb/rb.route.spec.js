/* jshint -W117, -W030 */
describe('rb routes', function () {
    describe('state', function () {
        var view = 'app/rb/views/articles-list.html';

        beforeEach(function() {
            module('app.rb', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state rb.list to url /rblist ', function() {
            expect($state.href('rb.list', {})).to.equal('/rblist');
        });

        it('should map /rblist route to rb View template', function () {
            // console.log($state.get('rb.list'));
            expect($state.get('rb.list').views.rb.templateUrl).to.equal(view);
        });

        it('of rb.list should work with $state.go', function () {
            $state.go('rb.list');
            $rootScope.$apply();
            expect($state.is('rb.list'));
        });
    });
});
