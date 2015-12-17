angular
  .module('maps', [
    'ui.router'
  ])

  .config (function($stateProvider) {
    $stateProvider


  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map/map.html',
        controller: 'MapsController'
      }
    }
  });

});
