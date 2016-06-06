'use strict';
(function(){

  class RdvsComponent {
    constructor(uiGmapGoogleMapApi) {

      this.map = {
        center: {latitude: 45, longitude: -73 }, zoom: 8
      };

      uiGmapGoogleMapApi.then(function(maps) {

      });
    };
  };

  angular.module('rendezvousApp')
  .component('rdvs', {
    templateUrl: 'app/rdvs/rdvs.html',
    controller: RdvsComponent
  });

})();
