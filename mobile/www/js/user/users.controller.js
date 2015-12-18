(function() {
  'use strict';

  angular
  .module('users')
  .controller('UsersController', function ($scope, $auth, $stateParams, UsersService, DependentsService, $location){
    // UsersService.getUsers().success(function (users) {
    //   console.log(users);
    //     $scope.users = users;
    //   });

      // if($stateParams.userId) {
      // UsersService.getSingleUser($stateParams.userId).success(function (singlePost) {

        // UsersService.getSingleUser("567171afd92ae003001460ea").success(function (singleUser) {
        //   console.log(singleUser);
        //   $scope.singleUser = singleUser;
        // });
      // }

      // $scope.newUser = function (user) {
      //   console.log(user);
      //   UsersService.addUser(user);


        $scope.newUser = function(user) {
          console.log("something", user);
          $auth.signup({
            // displayName: $scope.displayName,
            email: user.email,
            password: user.password
          }).catch(function(response) {
           console.log("ERROR", response);
          });
        };



// navigates to the editUser.html with the gotoEditUser function
      $scope.gotoeditUser = function (id) {
        UsersService.getSingleUser(id).success(function (singleUser){
          console.log(singleUser);
          $scope.singleUser = singleUser;
          $location.path('/app/users/'+ id+'/edit');
        });
      };

//Is this supposed to be here???
      $scope.editUser = function (editedUser) {
        console.log(editedUser);
        UsersService.updateUser(editedUser).success(function() {
          console.log("EDIT",editedUser);
          $location.path('/app/userprofile');
          $scope.singleUser = singleUser;
        });
      };

      $scope.$on('user:edited', function () {

      });

      $scope.deleteUser = function (userId) {
        UsersService.removeUser(userId);
      };
      $scope.addPharmacy = function (pharmacy) {
        console.log(pharmacy);
        UsersService.addUser.pharmacy(pharmacy);
      };
      $scope.deletePharmacy = function (pharmacy) {
        UsersService.removeUser.pharmacy(pharmacy);
      };



  });

}());
