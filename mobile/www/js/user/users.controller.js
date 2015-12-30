(function() {
  'use strict';

  angular
  .module('users')
  .controller('UsersController', function ($scope, $auth, $stateParams, UsersService, DependentsService, $location, MapsService, $state, $window){
    // UsersService.getUsers().success(function (users) {
    //   console.log(users);
    //     $scope.users = users;
    //   });
    $scope.singleUser;

        UsersService.getSingleUser().success(function (singleUser) {
          console.log(singleUser);
          $scope.singleUser = singleUser;
  });


        MapsService.getPharmacy().success(function (pharmacy) {
        console.log("Pharmacy from users controller:",pharmacy);
        var pharmacyId = $scope.singleUser._id;
        console.log("This is scope.singleUser._id:", $scope.singleUser._id);
        console.log(pharmacyId);

        $scope.pharmacyArr = [];
        // $scope.pharmacy = pharmacy;
        for(var i = 0; i <= pharmacy.length; i++) {
          console.log("this is pharmacy i", i);
          if (pharmacyId === pharmacy[i].user){
            console.log(pharmacy[i].name);
            console.log(pharmacy[i]._id);
            // pharmacyArr.push(pharmacy[i].name);
            $scope.pharmacyArr.push(pharmacy[i]);
            console.log($scope.pharmacyArr);
        }else {
            console.log("User does not have a current pharmacy on file");
          }
        }
      });





      DependentsService.getDependents().success(function (dependents) {
        // console.log('what are these', dependents[3].user);
        // console.log('get dependets',$scope.singleUser._id);
        var userData = $scope.singleUser._id;
        console.log("This is scope.singleUser._id:", $scope.singleUser._id);

        console.log('test', userData);
        $scope.dependentsArr = [];
            // console.log('logging success',dependents[3].user);
            // $scope.dependents = dependents[i];
            // console.log(dependents);
            for(var i = 0; i <= dependents.length; i++) {
              // console.log("this is i", i);
              if (userData === dependents[i].user){
                // console.log(dependents[i].name);
                // console.log(dependents[i]._id);
                // return dependents[i];
                // dependentsArr.push(dependents[i].name);
                $scope.dependentsArr.push(dependents[i]);
                // console.log($scope.dependentsArr);
            }else {
                console.log("User does not have dependents");
            }
          }

        });


        // $scope.getSingleDependent = function (dependent) {
        //   console.log('get single dependent controller', dependent);
        //   $scope.dependent = dependent;
        //   $location.path('/app/userprofile/dependent/'+ dependent._id);
        // };


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
          // $location.path('app/userprofile');
          $location.path('auth/login');

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
          $state.go('app.userprofile');
          // $scope.singleUser = singleUser; // refreshes the profile page after the edit
          $window.location.reload(true)

        });
      };


      $scope.$on('user:edited', function () {

      });

      $scope.deleteUser = function (userId) {
        UsersService.removeUser(userId);
      };
      // $scope.addPharmacy = function (pharmacy) {
      //   console.log(pharmacy);
      //   UsersService.addUser.pharmacy(pharmacy);
      // };
      $scope.deletePharmacy = function (Id) {
        MapsService.deletePharmacy(Id);
        $window.location.reload(true)
      };

      $scope.gotoeditDependent = function (id) {
        console.log("go to edit dependent being fired!");
        DependentsService.getSingleDependent(id).success(function (dependent){
          console.log(dependent);
          $scope.dependent = dependent;
          $location.path('/app/userprofile/dependent/'+ id + '/edit');
        });
      };

  });

}());
