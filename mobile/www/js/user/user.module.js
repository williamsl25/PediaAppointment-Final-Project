
angular
  .module('users', [
    'ui.router'
  ])

.config(function($stateProvider) {
  $stateProvider

  // all users
    .state('app.users', {
      url: '/users',
      controller: 'UsersController',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/users.html'
        }
      }
    })

    // user profile page
    .state('app.userprofile', {
      url: '/userprofile',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/userprofile.html',
          controller: 'PlaylistCtrl'
        }
      }
    })
    // edit user
    .state('app.editUser', {
      url: '/users/:userId/edit',
      controller: 'UsersController',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/editUser.html'
        }
      }
    })

      //addUser
    .state('app.newuser', {
      url: '/newuser',
      controller: 'UsersController',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/newuser.html'
        }
      }
    })









  });
