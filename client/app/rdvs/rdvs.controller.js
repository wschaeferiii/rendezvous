'use strict';
(function(){

  class RdvsComponent {
    constructor(rdvService, personsService, uiGmapGoogleMapApi, $http, $scope, socket, geocoder, $geolocation) {

      this.rdvService = rdvService;
      this.personsService = personsService;
      this.$geolocation = $geolocation;
      this.$http = $http;
      this.socket = socket;
      this.rdvList = [];
      this.peopleList = [];
      this.htmlgeolocation = {};
      this.$scope = $scope;

      this.placeId = '';

      this.coords = this.$geolocation.position.coords; // this is regularly updated

      this.error = this.$geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('person');
      });

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

    convertDate() {
      var newDate = new Date();
      newDate.setTime(this.$geolocation.position.timestamp* 1000);
      dateString = newDate.toUTCString();
    }

    getCurrentLocation() {
      this.$geolocation.getCurrentPosition()
      .then(location => {
        this.htmlgeolocation = location;
     });
    }

    watchLocation() {
      this.$geolocation.watchPosition({
        timeout: 10000,
        maximumAge: 2,
        enableHighAccuracy: true
      });
    }

    $onInit() {
      this.centerMapFromGeoLocation();
      this.$http.get('/api/persons')
      .then(response => {
        this.peopleList = response.data;
        console.log('peopleList: ', this.peopleList);
        this.socket.syncUpdates('person', this.peopleList);
      });
      this.rdvService.getRdvs()
      .then(response => {
        this.rdvList = response.data;
        this.socket.syncUpdates('rdv', this.rdvList);
      });
    };

    centerMapFromGeoLocation() {
      this.rdvService.getGeoLocation()
      .then((json) => {
        this.geoLocation = json.data;
        this.map.center.latitude = this.geoLocation.location.lat;
        this.map.center.longitude = this.geoLocation.location.lng;
      });
    }

    addPerson() {
      this.$geolocation.getCurrentPosition()
      .then(location => {
        this.htmlgeolocation = location;
        return this.htmlgeolocation;
      })
      .then((geoLocation) => {
        this.$http.post('/api/persons', {
          coords: {
            latitude: this.htmlgeolocation.coords.latitude,
            longitude: this.htmlgeolocation.coords.longitude
          }
        })
      });
    };

    addRdv() {
      this.rdvLat = this.output.geometry.location.lat();
      this.rdvLng = this.output.geometry.location.lng();

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

    deletePerson(person) {
      this.personsService.deletePerson(person);
    }

  }

  angular.module('rendezvousApp')
  .component('rdvs', {
    templateUrl: 'app/rdvs/rdvs.html',
    controller: RdvsComponent
  });

})();
