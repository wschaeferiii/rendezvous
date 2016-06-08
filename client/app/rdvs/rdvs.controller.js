'use strict';
(function(){

class RdvsComponent {
  constructor(rdvService, uiGmapGoogleMapApi, uiGmapIsReady) {

    console.log('RdvsComponent is alive!');

    this.rdvService = rdvService;
    this.addRdv = addRdv;
    this.rdvList = [];
    this.listRdvs();

    function addRdv() {
      this.rdvList.push({title: this.title, originAddress: this.originAddress, destinationAddress: this.destinationAddress});
    }

    uiGmapGoogleMapApi
    .then(function(maps){
      this.map = {
          center: {
              latitude: 37.7749295,
              longitude: -122.4194155
          },
          zoom: 13
      };
    });
  };

  // use rdvService b/c we need origin and destination addresses from rdv model
  listRdvs() {
    this.rdvService.getRdvs()
    .then((json) => {
      this.rdvList = json.data;
      console.log('rdvList', this.rdvList);
    });


  };




  //     return uiGmapGoogleMapApi;

  //   })

  //   // load the map and create directions service and renderer
  //   .then(function(maps) {


  //     this.directionsService = new google.maps.DirectionsService();
  //     this.directionsDisplay = new google.maps.DirectionsRenderer();

  //     this.map = {
  //       center: {latitude: 33.7490, longitude: -84.3880},
  //       zoom: 10
  //     };

  //     return uiGmapIsReady.promise(1);

  //   })

  //   .then(function(instances) {
  //     var instanceMap = instances[0].map;

  //     this.directionsDisplay.setMap(instanceMap);

  //     this.directionsService.route(directionsServiceRequest, function(response, status) {
  //       if (status == google.maps.DirectionsStatus.OK) {
  //           this.directionsDisplay.setDirections(response);
  //       }
  //     });
  //   })

  // };

  };
  angular.module('rendezvousApp')
  .component('rdvs', {
    templateUrl: 'app/rdvs/rdvs.html',
    controller: RdvsComponent
  });

})();
