angular
  .module('dependents', [
    'ui.router'
  ])

.config(function($stateProvider) {
  $stateProvider

  // all dependents
    .state('app.dependents', {
      url: '/dependents',

      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/dependents.html',
          controller: 'DependentsController'
        }
      }
    })

    // dependent profile page
    .state('app.singleDependent', {
      url: '/singleDependent',
      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/singleDependent.html',
          controller: 'DependentsController'
        }
      }
    })
    // edit dependent
    .state('app.editDependent', {
      url: '/dependents/:dependentId/edit',

      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/editDependent.html',
          controller: 'DependentsController'
        }
      }
    })

      //add dependent
    .state('app.addDependent', {
      url: '/addDependent',

      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/addDependent.html',
          controller: 'DependentsController'
        }
      }
    });


  });
