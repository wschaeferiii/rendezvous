'use strict';

angular.module('rendezvousApp',
               ['rendezvousApp.auth',
               'rendezvousApp.admin',
               'rendezvousApp.constants',
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'btford.socket-io',
               'ui.router',
               'ui.bootstrap',
               'validation.match'
               ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
