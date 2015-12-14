(function() {
  'use strict';

  angular
  .module('users')
  .controller('UsersController', function ($scope, $stateParams, UsersService, DependentsService, $location){
    UsersService.getUsers().success(function (users) {
        $scope.users = users;
      });

      if($stateParams.userId) {
        UsersService.getSingleUser($stateParams.userId).success(function (singlePost) {
          console.log(singleUser);
          $scope.singleUser = singleUser;
        });
      }

      $scope.newUser = function (user) {
        console.log(user);
        UsersService.addUser(user);
      };

      $scope.editUser = function (editedUser) {
        UsersService.updateUser(editedUser);
      };
      $scope.deleteUser = function (userId) {
        UsersService.removeUser(userId);
      };

  });

}());
