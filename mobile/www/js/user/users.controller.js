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

        UsersService.getSingleUser().success(function (singleUser) {
          console.log(singleUser);
          $scope.singleUser = singleUser;
        });


      // $scope.newUser = function (user) {
      //   console.log(user);
      //   UsersService.addUser(user);
      DependentsService.getDependents().success(function (dependents) {
        console.log(dependents);
          $scope.dependents = dependents;
        });




        $scope.newUser = function(user) {
          console.log("User Being Created", user);
          $auth.signup({
            // displayName: $scope.displayName,
            name: user.name,
            password: user.password,
            phone: user.phone,
            email: user.email
          }).catch(function(response) {
           console.log("ERROR", response);
          });
          $location.path('app/userprofile');
        };



// navigates to the editUser.html with the gotoEditUser function
      $scope.gotoeditUser = function (id) {
        UsersService.getSingleUser(id).success(function (singleUser){
          console.log(singleUser);
          $scope.singleUser = singleUser;
          $location.path('/app/users/'+ singleUser._id+'/edit');
        });
      };

//Is this supposed to be here???
      $scope.editUser = function (editedUser) {
        console.log(editedUser);
        UsersService.updateUser(editedUser).success(function() {
          console.log("EDIT",editedUser);
          $location.path('/app/userprofile');
          $scope.singleUser = singleUser; // refreshes the profile page after the edit
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
