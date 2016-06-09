'use strict';

angular.module('rendezvousApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('geocoder', {
        url: '/geocoder',
        template: '<geocoder></geocoder>'
      });
  });
