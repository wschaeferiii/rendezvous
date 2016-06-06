'use strict';

describe('Component: RdvsComponent', function () {

  // load the controller's module
  beforeEach(module('rendezvousApp'));

  var RdvsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RdvsComponent = $componentController('RdvsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
