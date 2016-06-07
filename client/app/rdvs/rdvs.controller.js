'use strict';
(function(){

  class RdvsComponent {
    constructor(uiGmapGoogleMapApi) {
      console.log('RdvsComponent is alive')
      this.map = {
              center: {latitude: 51.219053, longitude: 4.404418},
              zoom: 14
            }
      uiGmapGoogleMapApi.then(function(map) {
        console.log('asynchronous function!')
      });
    };
  };

  angular.module('rendezvousApp')
  .component('rdvs', {
    templateUrl: 'app/rdvs/rdvs.html',
    controller: RdvsComponent
  });

})();
