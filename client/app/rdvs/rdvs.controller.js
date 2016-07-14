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

      this.placeId = '5788098ed1beee0cb7917ab3';

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('person');
      });

      this.centerMapFromGeoLocation();

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
        this.markers = response.data;
        this.socket.syncUpdates('person', this.markers);
      });
      this.rdvService.getRdvs()
      .then(response => {
        this.rdvList = response.data;
        this.socket.syncUpdates('rdv', this.rdvList);
      });
    };

    addRdvToMap() {
      this.$http.get('/api/rdvs')
      .then(response => {
        this.rdvList = response.data;
        this.socket.syncUpdates('rdv', this.rdvList);
      });
    }

    centerMapFromGeoLocation() {
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
      this.rdvLat = this.output.geometry.location.lat();
      console.log(this.rdvLat);

      this.rdvLng = this.output.geometry.location.lng();
      console.log(this.rdvLng);

      this.$http.post('/api/rdvs', {
        coords: {
          latitude: this.rdvLat,
          longitude: this.rdvLng
        },
        address: this.output.formatted_address
      })
      .then(function(post) {
        console.log(post.data);
      });
    };

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
