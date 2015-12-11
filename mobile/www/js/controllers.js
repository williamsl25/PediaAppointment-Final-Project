angular.module('PediaAppointment.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

// ***** Dependent Modal****
    $ionicModal.fromTemplateUrl('templates/dependent.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // *****  Password Reset Modal ****
      $ionicModal.fromTemplateUrl('templates/resetpassword.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });



// *****Added for Google Map *******
  // $ionicModal.fromTemplateUrl('templates/map.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // *****Added for Reset Password *******
    // $ionicModal.fromTemplateUrl('templates/resetpassword.html', {
    //   scope: $scope
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  //Close the map modal
  // $scope.closeMap = function() {
  //   $scope.modal.hide();
  // };

  //Close the Dependent modal
  $scope.closeDependent = function() {
    $scope.modal.hide();
  };

  // //Close the reset password modal
  $scope.closeReset = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

//Open the map modal
  // $scope.map = function(){
  //   $scope.modal.show();
  // };

  //Open the Dependent modal
    $scope.addDependent = function(){
      $scope.modal.show();
    };
  // //Open the reset password modal
  $scope.reset = function(){
    $scope.modal.show();
  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // $scope.addDependent = function() {
  //   console.log('Doing login', $scope.loginData);
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.addProfile = function() {
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

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


//***************** Google Map*********************
    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        console.log("map being triggered");
        var myLatlng = new google.maps.LatLng(32.7833,-79.9333);


        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);

      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };

      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click');
      };

//*******places

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length === 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});



    });
