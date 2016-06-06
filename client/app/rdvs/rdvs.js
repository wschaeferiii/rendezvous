'use strict';

angular.module('rendezvousApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rdvs', {
        url: '/rdvs',
        template: '<rdvs></rdvs>'
      });
  });
