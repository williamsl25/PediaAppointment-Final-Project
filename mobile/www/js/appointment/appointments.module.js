angular
  .module('appointments', [
    'ui.router'
  ])

.config(function($stateProvider) {
  $stateProvider

  // add appointments
  .state('app.appointment', {
    url: '/appointment',
    views: {
      'menuContent': {
        templateUrl: 'templates/appointment/appointment.html',
        controller: 'AppointmentsController'
      }
    }
  })

  // view all appointments
  .state('app.confirmation', {
    url: '/confirmation',
    views: {
      'menuContent': {
        templateUrl: 'templates/appointment/confirmation.html',
        controller: 'AppointmentsController'
      }
    }
  });

  });
