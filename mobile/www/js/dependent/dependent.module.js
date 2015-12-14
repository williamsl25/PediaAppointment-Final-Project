angular
  .module('dependents', [
    'ui.router'
  ])

.config(function($stateProvider) {
  $stateProvider

  // all dependents
    .state('app.dependents', {
      url: '/dependents',
      controller: 'DependentsController',
      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/dependents.html'
        }
      }
    })

    // dependent profile page
    .state('app.dependentProfile', {
      url: '/dependentprofile',
      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/dependentProfile.html',
          controller: 'PlaylistCtrl'
        }
      }
    })
    // edit dependent
    .state('app.editDependent', {
      url: '/dependents/:dependentId/edit',
      controller: 'DependentsController',
      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/editDependent.html'
        }
      }
    })

      //addDependent
    .state('app.addDependent', {
      url: '/addDependent',
      controller: 'DependentsController',
      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/addDependent.html'
        }
      }
    });









  });
