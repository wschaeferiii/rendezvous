'use strict';

angular.module('rendezvousApp')
  .service('rdvService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var svc = this;

    svc.findRdvById = function(id) {
      return $http.get('/api/rdvs/' + id);
    };

    svc.getRdvs = function() {
      return $http.get('/api/rdvs');
    };
  });

