/* jshint -W117, -W030 */
describe('TrialWatsonController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.trial-watson');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('TrialWatsonController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('TrialWatson controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of TrialWatson', function() {
                expect(controller.title).to.equal('TrialWatson');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
