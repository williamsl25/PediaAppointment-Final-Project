(function() {
    'use strict';
    angular.module('dependents').controller('DependentsController',
        function($scope, $stateParams, DependentsService, UsersService,
            $location, MapsService, $ionicLoading, $compile, $state, $window) {

            UsersService.getSingleUser().success(function (singleUser) {
                // console.log(singleUser);
                $scope.singleUser = singleUser;
            });

            $scope.goToDepProfile = function(id) {
                // console.log("STATE", id);
                $state.go('app.dependentProfile',{dependentId: id});
            };

            $scope.getSingleDependent = function() {
              DependentsService.getSingleDependent($stateParams.dependentId).success(function(singleDependent) {
                $scope.singleDependent = singleDependent;
                // console.log("OBJ", $scope.singleDependent);
                // console.log("id",singleDependent._id);
                // console.log("name", singleDependent.name);
                // console.log("dob",singleDependent.dob);
                // console.log(singleDependent.history);
              });
            };

            $scope.newDependent = function(dependent) {
                // console.log('new dependent firing!',dependent);
                DependentsService.addDependent(dependent);
                  $state.go('app.userprofile');
                  $window.location.reload(true);
              };

            $scope.editDependent = function(editedDependent) {
                // console.log(editedDependent);
                DependentsService.updateDependent(editedDependent).success(function() {
                  // console.log("EDIT", editedDependent);
                  $state.go('app.userprofile');
                  $window.location.reload(true); //will refresh the page
                });
            };

            $scope.deleteDependent = function(dependentId) {
              // console.log(dependentId);
              DependentsService.removeDependent(dependentId).success(function(){
                // console.log("dependent deleted", dependentId);
                $state.go('app.userprofile');
                $window.location.reload(true); //will refresh the page
              });
            };
      });
}());
