'use strict';
(function(){

class GeocoderComponent {
  constructor($scope, geocoder) {
    $scope.my_place_id = "ChIJdd4hrwug2EcRmSrV3Vo6llI";
  }
}

angular.module('rendezvousApp')
  .component('geocoder', {
    templateUrl: 'app/geocoder/geocoder.html',
    controller: GeocoderComponent
  });

})();
