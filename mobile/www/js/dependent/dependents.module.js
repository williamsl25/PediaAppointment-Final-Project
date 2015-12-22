angular
  .module('dependents', [
    'ui.router'
  ])

.config(function($stateProvider) {
  $stateProvider

  // all dependents
    // .state('app.dependents', {
    //   url: '/dependents',
    //
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/dependent/dependents.html',
    //       controller: 'DependentsController'
    //     }
    //   }
    // })

    // dependent profile page
    .state('app.dependentProfile', {
      url: '/userprofile/dependent/:dependentId',
      views: {
        'menuContent': {
          templateUrl: 'templates/dependent/dependentProfile.html',
          controller: 'DependentsController'
        }
      }
    })
    // edit dependent
    .state('app.editDependent', {
      url: '/userprofile/dependent/:dependentId/edit',

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
