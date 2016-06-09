'use strict';

describe('Service: personsService', function () {

  // load the service's module
  beforeEach(module('rendezvousApp'));

  // instantiate service
  var personsService;
  beforeEach(inject(function (_personsService_) {
    personsService = _personsService_;
  }));

  it('should do something', function () {
    expect(!!personsService).to.be.true;
  });

});
