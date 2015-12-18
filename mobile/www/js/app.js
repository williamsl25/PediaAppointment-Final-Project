// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('PediaAppointment', [
  'ionic',
  'ionic-datepicker',
  'PediaAppointment.controllers',
  'users',
  'dependents',
  'appointments',
  'maps',
  'uiGmapgoogle-maps',
  'satellizer'

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
.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB0FoHMlrxoAq_5wn6bd-GnawFaaggaq7E',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'places' // Required for SearchBox.
  });

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })
  //
  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // })
      .state('app.contact', {
        url: '/contact',
        views: {
          'menuContent': {
            templateUrl: 'templates/contact.html',
            controller: 'PlaylistCtrl'
          }
        }
      })
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: 'templates/login.html'
      })
      .state('auth.logout', {
        url: '/logout',
        views: {
          'login': {
            templateUrl: 'templates/user/loginhome.html',
            controller: 'LoginController'
          }
        }
      })
      .state('auth.login', {
        url: '/login',
        views: {
          'login': {
            templateUrl: 'templates/user/loginhome.html',
            // controller: 'PlaylistCtrl'
            controller: 'LoginController'

          }
        }
      })
        .state('auth.resetpassword', {
          url: '/resetpassword',
          views: {
            'login': {
              templateUrl: 'templates/resetpassword.html',
              controller: 'PlaylistCtrl'
            }
          }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('auth/login');
})


.config(function ($authProvider) {
  if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
     $authProvider.cordova = true;
   }

  //  $authProvider.loginUrl = "https://pediaserver.herokuapp.com/auth/login";
   $authProvider.loginUrl = "auth/login";

  $authProvider.google({
     clientId: '779018185446-393jg2j9akjhitl3nci0f1p9tgb0tu13.apps.googleusercontent.com',
     url: 'https://pediaserver.herokuapp.com/auth/google',
     redirectUri: 'http://localhost'
   });

});
