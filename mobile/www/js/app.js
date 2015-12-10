// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('PediaAppointment', [
  'ionic', 'PediaAppointment.controllers'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.newuser', {
    url: '/newuser',
    views: {
      'menuContent': {
        templateUrl: 'templates/newuser.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

    // ********Here is where we are adding in New items
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/appointment.html',
            controller: 'PlaylistCtrl'
          }
        }
      })

      .state('app.userprofile', {
        url: '/userprofile',
        views: {
          'menuContent': {
            templateUrl: 'templates/userprofile.html',
            controller: 'PlaylistCtrl'
          }
        }
      })

      .state('app.appointment', {
        url: '/appointment',
        views: {
          'menuContent': {
            templateUrl: 'templates/appointment.html',
            controller: 'PlaylistCtrl'
          }
        }
      })

      .state('app.confirmation', {
        url: '/confirmation',
        views: {
          'menuContent': {
            templateUrl: 'templates/confirmation.html',
            controller: 'PlaylistCtrl'
          }
        }
      })

      .state('app.contact', {
        url: '/contact',
        views: {
          'menuContent': {
            templateUrl: 'templates/contact.html',
            controller: 'PlaylistCtrl'
          }
        }
      })
// *****We will need to fix this as logout would
// not be an actual screen but return to login page ******
      .state('app.logout', {
        url: '/logout',
        views: {
          'login': {
            templateUrl: 'templates/loginhome.html',
            controller: 'PlaylistCtrl'
          }
        }
      // })



  });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
