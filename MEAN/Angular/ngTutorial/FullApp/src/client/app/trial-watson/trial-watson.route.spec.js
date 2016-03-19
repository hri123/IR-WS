/* jshint -W117, -W030 */
describe('trial-watson routes', function () {
    describe('state', function () {
        var view = 'app/trial-watson/trial-watson.html';

        beforeEach(function() {
            module('app.trial-watson', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state trial-watson to url /trial-watson ', function() {
            expect($state.href('trial-watson', {})).to.equal('/trial-watson');
        });

        it('should map /trial-watson route to trial-watson View template', function () {
            expect($state.get('trial-watson').templateUrl).to.equal(view);
        });

        it('of trial-watson should work with $state.go', function () {
            $state.go('trial-watson');
            $rootScope.$apply();
            expect($state.is('trial-watson'));
        });
    });
});
