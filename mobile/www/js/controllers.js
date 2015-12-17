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



  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.loginModal = modal;
  // });

  // *****Added for Reset Password *******
    // $ionicModal.fromTemplateUrl('templates/resetpassword.html', {
    //   scope: $scope
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });

  //Open the login modal
    // $scope.login = function(){
    //   $scope.loginModal.show();
    // };

  //Open the reset password modal
  // $scope.resetPassword = function(){
  //   $scope.modal.show();
  // };
  //
  // Close the login modal
  // $scope.closeLogin = function() {
  //   $scope.loginModal.hide();
  // };

  // // //Close the reset password modal
  // $scope.closeReset = function() {
  //   $scope.modal.hide();
  // };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.addDependent = function() {
  //   console.log('Doing login', $scope.loginData);
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.addUserProfile = function() {
  //   console.log('Doing login', $scope.loginData);
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.addPharmacy = function() {
  //   console.log('Doing login', $scope.loginData);
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.addPediatrician = function() {
  //   console.log('Doing login', $scope.loginData);
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.doReset = function() {
  //   console.log('Doing Password Reset', $scope.loginData);
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
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


//***************** Google Map functionality *********************
    .controller('MapCtrl', function($scope, $ionicLoading, $compile, MapsService) {
      $scope.namePlace = [];

      $scope.map = {
        center: {
          latitude: 32.7833,
          longitude: -79.9333
        },
        zoom: 10,
        marker: []
      };
      $scope.options = {scrollwheel: false};

      $scope.marker = {
                id: 0,
                coords: {
                    latitude: 32.7833,
                    longitude: -79.9333
                },
                title: 0,
                options: { draggable: false },
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                events: {
                    dragend: function (marker, eventName, args) {

                        $scope.marker.options = {
                            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                            labelAnchor: "100 0",
                            labelClass: "marker-labels"
                        };
                    }
                }
              };


var events = {
    places_changed: function (searchBox) {
    var place = searchBox.getPlaces();
        lat = place[0].geometry.location.lat();
        long = place[0].geometry.location.lng();
        if (!place || place === 'undefined' || place.length === 0) {
            return;
          }
           console.log('place', lat, long, place);
           console.log(place[0].name);
           console.log(place[0].formatted_address);
           console.log(place[0].formatted_phone_number);
           console.log(place[0].website);
           console.log(place[0].email);

           var newPlace = {
              name: place[0].name,
              address: place[0].formatted_address,
              phone: place[0].formatted_phone_number,
              website: place[0].website,
              // coords: {
              //   latitude: place[0].geometry.location.lat(),
              //   longitude: place[0].geometry.location.lng()
              // },
              mapurl: place[0].url,
              // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };
            console.log(newPlace);
            $scope.namePlace.push(newPlace);
            console.log('scope nameplace', $scope.namePlace);
        }
      };

      $scope.searchbox = { template:'searchbox.tpl.html', events:events};

      $scope.addPharmacy = function (pharmacy) {
        console.log('new pharmacy firing!');
        MapsService.addPharmacy(pharmacy);
        $location.path('/app/userprofile');
      };

});
