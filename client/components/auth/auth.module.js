'use strict';

angular.module('rendezvousApp.auth', ['rendezvousApp.constants', 'rendezvousApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
