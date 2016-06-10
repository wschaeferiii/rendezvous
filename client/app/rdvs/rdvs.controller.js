'use strict';
(function(){

  class RdvsComponent {
    constructor(rdvService, personsService, uiGmapGoogleMapApi, $http, $scope, socket, geocoder) {

      console.log('RdvsComponent is alive!');

      this.rdvService = rdvService;
      this.personsService = personsService;
      this.$http = $http;
      this.socket = socket;
      this.rdvList = [];
      this.markers = [];
      this.markerId = 0;


      this.newPlaceId = 'ChIJdd4hrwug2EcRmSrV3Vo6llI';

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('person');
      });

      this.centerMapFromLocation();

      this.map = {
        center: {
          latitude: '',
          longitude: ''
        },
        zoom: 13
      };

      uiGmapGoogleMapApi
      .then(function(){

      });

    };

    $onInit() {
      this.$http.get('/api/persons')
      .then(response => {
        console.log('persons: ', response.data);
        this.markers = response.data;
        console.log('this.markers: ', this.markers);
        this.socket.syncUpdates('person', this.markers);
      });
    }

    centerMapFromLocation() {
      this.rdvService.getGeoLocation()
      .then((json) => {
        this.geoLocation = json.data;
        this.map.center.latitude = this.geoLocation.location.lat;
        this.map.center.longitude = this.geoLocation.location.lng;
      });
    }

    addPersonCoordsToServer() {
      this.rdvService.getGeoLocation()
      .then((json) => {
        this.geoLocation = json.data;
        return this.geoLocation;
      })
      .then((geoLocation) => {
        this.$http.post('/api/persons', {
          coords: {
            latitude: geoLocation.location.lat,
            longitude: geoLocation.location.lng
          }
        })
      });
    };

    addRdv() {
      if (this.newRdv) {
        this.$http.post('/api/rdvs', {
          destinationAddress: this.newRdv
        });
        this.newRdv = '';
      }
    }

    deleteRdv(rdv) {
      this.$http.delete('/api/rdvs/' + rdv._id);
    }

  }

  angular.module('rendezvousApp')
  .component('rdvs', {
    templateUrl: 'app/rdvs/rdvs.html',
    controller: RdvsComponent
  });

})();
