(function() {
  'use strict';

  angular
  .module('users')
  .controller('UsersController', function ($scope, $stateParams, UsersService, DependentsService, $location){
    UsersService.getUsers().success(function (users) {
      console.log(users);
        $scope.users = users;
      });

      if($stateParams.userId) {
        UsersService.getSingleUser($stateParams.userId).success(function (singleUser) {
          console.log(singleUser);
          $scope.singleUser = singleUser;
        });
      }

      $scope.newUser = function (user) {
        console.log(user);
        UsersService.addUser(user);
      };

// navigates to the editUser.html with the gotoEditUser function
      $scope.gotoeditUser = function (id) {
        UsersService.getSingleUser(id).success(function (singleUser){
          console.log(singleUser);
          $scope.singleUser = singleUser;
          $location.path('/app/users/'+ id+'/edit')
        });
      };

      $scope.editUser = function (editedUser) {
        console.log(editedUser);
        UsersService.updateUser(editedUser).then(function() {
            $location.path('/app/userprofile');

        });

      };

      $scope.$on('user:edited', function () {
        UsersService.getUsers().success(function (user) {
          $scope.users = user;
        });
      })

      $scope.deleteUser = function (userId) {
        UsersService.removeUser(userId);
      };



  });

}());
