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
        controller: 'AppointmentsController',
        resolve: {
          userId: function ($q, UsersService) {
            var deferred = $q.defer();
            UsersService.getSingleUser().success(function (singleUser) {
              deferred.resolve(singleUser._id);
            });
            return deferred.promise;
          }

        }
      }
    }
  })

  // view all appointments
  .state('app.confirmation', {
    url: '/confirmation',
    views: {
      'menuContent': {
        templateUrl: 'templates/appointment/confirmation.html',
        controller: 'AppointmentsController',
        resolve: {
          userId: function ($q, UsersService) {
            var deferred = $q.defer();
            UsersService.getSingleUser().success(function (singleUser) {
              deferred.resolve(singleUser._id);
            });
            return deferred.promise;
          }

        }

      }
    }
  });

  });
