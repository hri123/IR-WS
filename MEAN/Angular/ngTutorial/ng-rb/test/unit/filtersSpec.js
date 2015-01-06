'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

    beforeEach(module('rbApp'));


    describe('orderObjectBy', function() {

        it('should convert boolean values to unicode checkmark or cross',
            inject(function(orderObjectByFilter) {
                expect(orderObjectByFilter({
                    "tag1": {
                        "value": 3,
                        "name": "tag1"
                    },
                    "tag2": {
                        "value": 5,
                        "name": "tag2"
                    }
                }, 'value')[0].value).toBe(5);
            }));
    });
});
