'use strict';

describe('Component: GeocoderComponent', function () {

  // load the controller's module
  beforeEach(module('rendezvousApp'));

  var GeocoderComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    GeocoderComponent = $componentController('GeocoderComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
