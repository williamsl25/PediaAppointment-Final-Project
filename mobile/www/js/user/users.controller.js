(function() {
  'use strict';

  angular
  .module('users')
  .controller('UsersController', function ($scope, $auth, $stateParams, UsersService, DependentsService, $location){
    // UsersService.getUsers().success(function (users) {
    //   console.log(users);
    //     $scope.users = users;
    //   });
$scope.singleUser;
// var dependentsArr = [];
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
        // console.log('what are these', dependents[3].user);
        // console.log('get dependets',$scope.singleUser._id);
        var userData = $scope.singleUser._id;
        console.log('test', userData);
        $scope.dependentsArr = [];
            console.log('logging success',dependents[3].user);
            // $scope.dependents = dependents[i];
            console.log(dependents);
            for(var i = 0; i <= dependents.length; i++) {
              console.log("this is i", i);
              if (userData === dependents[i].user){
                console.log(dependents[i].name);
                // return dependents[i];
                // dependentsArr.push(dependents[i].name);
                $scope.dependentsArr.push(dependents[i]);
                console.log($scope.dependentsArr);
            }else {
                console.log("User does not have dependents");
            }
          }

        });

        $scope.getSingleDependent = function (dependent) {
          console.log('get single dependent controller', dependent);
          $scope.dependent = dependent;
          $location.path('/app/userprofile/dependent/'+ dependent._id )
        };








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
          console.log(singleUser._id);
          $location.path('/app/users/' + singleUser._id +'/edit');
        });
      };

//Is this supposed to be here???
      $scope.editUser = function (singleUser) {
        console.log(singleUser);
        UsersService.updateUser(singleUser).success(function() {
          console.log("EDIT",singleUser);
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
