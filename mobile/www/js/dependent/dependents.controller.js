(function() {
  'use strict';

  angular
  .module('dependents')
  .controller('DependentsController', function ($scope, $stateParams, DependentsService, UsersService, $location, MapsService){
    // var vm = this;
    DependentsService.getDependents().success(function (dependents) {
      console.log(dependents);
        $scope.dependents = dependents;
      });
    //
    //   // if($stateParams.dependentId) {
    //   //   DependentsService.getSingleDependent("5672d5bab47b580300becbb0").success(function (singlePost) {
    //   //     console.log(singleDependent);
    //   //     $scope.dependent = dependent;
    //   //   });
    //   // }
    //   DependentsService.getSingleDependent("5672d5bab47b580300becbb0").success(function (dependent) {
    //     console.log(dependent);
    //     $scope.dependent = dependent;
    //   });

      $scope.newDependent = function (dependent) {
        console.log('new dependent firing!', dependent);
        DependentsService.addDependent(dependent);
        $location.path('/app/userprofile');
      };
      // vm.title = "this is add dependent - calvin";
      $scope.editDependent = function (editedDependent) {
        console.log(editedDependent);
        DependentsService.updateDependent(editedDependent).success(function() {
          console.log("EDIT",editedDependent);
          $location.path('/app/userprofile');
          $scope.dependent = dependent;
        });
      };

      $scope.$on('user:edited', function () {

      });

      $scope.gotoeditDependent = function (id) {
        DependentsService.getSingleDependent(id).success(function (dependent){
          console.log(dependent);
          $scope.dependent = dependent;
          $location.path('/app/userprofile/dependent/'+ id + '/edit');
        });
      };
      $scope.deleteDependent = function (dependentId) {
        DependentsService.removeDependent(dependentId);
      };
      $scope.gotodependentProfile = function (id) {
        DependentsService.getSingleDependent(id).success(function (dependent){
          console.log(dependent);
          $scope.dependent = dependent;
          $location.path('/app/userprofile/dependent/'+ id);
        });
      };

  });

}());
