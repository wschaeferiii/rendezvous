'use strict';
(function(){

  class RdvsComponent {
    constructor(rdvService, uiGmapGoogleMapApi, $http, $scope, socket) {

      console.log('RdvsComponent is alive!');

      this.rdvService = rdvService;
      this.$http = $http;
      this.socket = socket;
      this.rdvList = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('rdv');
      });

      // this.listRdvs();

      this.grabLocation();

      this.addGeoLocationMarker();


      this.map = {
        center: {
          latitude: '',
          longitude: ''
        },
        zoom: 13
      };

      this.mapMarker = {
        idKey: 1,
        coords: {
          latitude: '',
          longitude: ''
        }
      }

      uiGmapGoogleMapApi
      .then(function(maps){

      });
    };

    grabLocation() {
      this.rdvService.getGeoLocation()
      .then((json) => {
        this.geoLocation = json.data;
        console.log(this.geoLocation);
        this.map.center.latitude = this.geoLocation.location.lat;
        this.map.center.longitude = this.geoLocation.location.lng;
      });
    }

    addGeoLocationMarker() {
      this.rdvService.getGeoLocation()
      .then((json) => {
        this.geoLocation = json.data;
        this.mapMarker.coords.latitude = this.geoLocation.location.lat;
        console.log('lat: ', this.mapMarker.coords.latitude)
        this.mapMarker.coords.longitude = this.geoLocation.location.lng;
        console.log('long: ', this.mapMarker.coords.longitude)
      });
    };

    // listRdvs() {
    //   // use rdvService b/c we need origin and destination addresses from rdv model
    //   this.rdvService.getRdvs()
    //   .then((json) => {
    //     this.rdvList = json.data;
    //     console.log('rdvList', this.rdvList);
    //   });
    // };

    $onInit() {
      this.$http.get('/api/rdvs')
        .then(response => {
          this.rdvList = response.data;
          this.socket.syncUpdates('rdv', this.rdvList)
        });
    }

    addRdv() {
      if (this.newRdv) {
        this.$http.post('/api/rdvs', {
          destinationAddress: this.newRdv
        });
        console.log('newRdv: ', this.newRdv);
        this.newRdv = '';
      }
    }

    deleteRdv(Rdv) {
      this.$http.delete('/api/rdvs/' + rdv._id);
    }
  }

  angular.module('rendezvousApp')
  .component('rdvs', {
    templateUrl: 'app/rdvs/rdvs.html',
    controller: RdvsComponent
  });

})();
