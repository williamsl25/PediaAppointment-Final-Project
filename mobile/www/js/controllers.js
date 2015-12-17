angular.module('PediaAppointment.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.resetData = {};
})

.controller('PlaylistCtrl', function($scope, $ionicModal, $stateParams) {
  $ionicModal.fromTemplateUrl('templates/resetpassword.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  //Open the reset password modal
  $scope.resetPassword = function(){
    $scope.modal.show();
  };
  // //Close the reset password modal
  $scope.closeReset = function() {
    $scope.modal.hide();
  };
})

.controller('LoginController', function ($scope,$state, $stateParams, $auth, $ionicPopup, $window, $ionicModal) {
    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };
    $scope.login = function() {
        $auth.login({
            email: $scope.email,
            password: $scope.password
          })
          .then(function(res) {
            console.log(res);
            $window.localStorage.setItem('userRole', res.data.role);
            // $state.go('tab.photos');
            $state.go('/app/userprofile');
          })
          .catch(function(response) {

          });
      };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(res) {
            $window.localStorage.setItem('userRole', res.data.role);
            $ionicPopup.alert({
              title: 'Success',
              content: 'You have successfully logged in!'
            });
            // $state.go('tab.photos');
            $state.go('/app/userprofile');

          })
          .catch(function(response) {
            $ionicPopup.alert({
              title: 'Error',
              content: response.data ? response.data || response.data.message : response
            });

          });
      };
      $scope.logout = function() {
        $auth.logout().then(function () {

          $ionicPopup.alert({
            title: "You've been logged out!"
          });
          $state.go('login');
        });
      };
      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

  })
  .controller('AccountCtrl', function($scope, $auth) {
    $scope.settings = {
      enableFriends: true
    };

});
