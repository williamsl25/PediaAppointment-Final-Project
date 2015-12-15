(function() {
  'use strict';

  angular
  .module('dependents')
  .controller('DependentsController', function ($scope, $stateParams, DependentsService, UsersService, $location){
    var vm = this;
    DependentsService.getDependents().success(function (dependents) {
        $scope.dependents = dependents;
      });

      if($stateParams.dependentId) {
        DependentsService.getSingleDependent($stateParams.dependentId).success(function (singlePost) {
          console.log(singleDependent);
          $scope.singleDependent = singleDependent;
        });
      }

      $scope.newDependent = function (dependent) {
        console.log('new dependent firing!');
        DependentsService.addDependent(dependent);
        $location.path('/app/userprofile');
      };
      vm.title = "this is add dependent - calvin";
      $scope.editDependent = function (editedDependent) {
        DependentsService.updateDependent(editedDependent);
      };
      $scope.deleteDependent = function (dependentId) {
        DependentsService.removeDependent(dependentId);
      };

  });

}());
