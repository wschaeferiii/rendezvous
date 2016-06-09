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

      $scope.newPlaceId = 'ChIJdd4hrwug2EcRmSrV3Vo6llI';

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('rdv');
      });

      this.centerMapFromLocation();
      this.addGeoLocationMarker();
      this.addPersonCoordsToServer();

      this.personsService.getPersons()
      .then((json) => {
        this.updatePersonsFromServer(json.data);
      })

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
      .then(function(){

      });

    };

    find(markers, person) {
      var len = markers.length;
      for (var i = 0; i < len; i++) {
        if (markers[i]._id === person._id) {
          return markers[i];
        }
      }
      return null;
    }

    // diff the personsFromServcer with our current markers and make the incremental modifications
    updatePersonsFromServer(personsFromServer) {
      // add markers from personsFromServer not found in this.markers
      var len = personsFromServer.length;
      var personMarker;
      for (var i = 0; i < len; i++) {
        personMarker = personsFromServer[i];
        if (!this.find(this.markers, personMarker)) {
          this.markers.splice(i, 0, personMarker);
        }
      }
      // check for remove or update
      i = this.markers.length;
      while (i--) {
        personMarker = this.markers[i];
        // remove markers in this.markers not found in personsFromServer
        var found = this.find(personsFromServer, personMarker);
        if (!found) {
          this.markers.splice(i, 1);
        }
      }
    }

    centerMapFromLocation() {
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
        this.mapMarker.coords.longitude = this.geoLocation.location.lng;
      });
    };

    addPersonCoordsToServer() {
      this.rdvService.getGeoLocation()
      .then((json) => {
        return this.geoLocation = json.data;
      }).then((geoLocation) => {
        console.log('geoLocation: ', geoLocation);
        this.$http.post('/api/persons', {
          currentLat: geoLocation.location.lat,
          currentLng: geoLocation.location.lng
        });
      })
    }

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
