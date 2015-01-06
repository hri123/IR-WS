'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('rbApp'));

  // Test service availability
  it('check the existence of rbFiles factory', inject(function(rbFiles) {
      expect(rbFiles).toBeDefined();
    }));
});