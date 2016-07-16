'use strict';

angular.module('rendezvousApp')
.service('personsService', function ($http) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  var svc = this;

  svc.getPersons = function() {
    return $http.get('/api/persons');
  }

  svc.deletePerson = function(person) {
    return $http.delete('api/persons/' + person._id);
  }

});
