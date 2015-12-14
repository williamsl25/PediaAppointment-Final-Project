angular
  .module('dependents', [
    'ui.router'
  ])

.config(function($stateProvider) {
  $stateProvider

  .state('app.adddependent', {
    url: '/adddependent',
    views: {
      'menuContent': {
        templateUrl: 'templates/dependent/adddependent.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // // all users
  //   .state('app.users', {
  //     url: '/users',
  //     controller: 'UsersController',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/user/users.html'
  //       }
  //     }
  //   })
  //   // user profile page
  //   .state('app.userprofile', {
  //     url: '/userprofile/dependent',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/user/userprofile.html',
  //         controller: 'PlaylistCtrl'
  //       }
  //     }
    // });

  });
