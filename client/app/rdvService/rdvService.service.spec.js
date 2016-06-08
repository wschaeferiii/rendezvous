'use strict';

describe('Service: rdvService', function () {

  // load the service's module
  beforeEach(module('rendezvousApp'));

  // instantiate service
  var rdvService;
  beforeEach(inject(function (_rdvService_) {
    rdvService = _rdvService_;
  }));

  it('should do something', function () {
    expect(!!rdvService).to.be.true;
  });

});
