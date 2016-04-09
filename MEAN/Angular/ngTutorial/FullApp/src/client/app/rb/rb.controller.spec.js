/* jshint -W117, -W030 */
describe('RBController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.rb');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('RBController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('RB controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of RB', function() {
                expect(controller.title).to.equal('RB');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
