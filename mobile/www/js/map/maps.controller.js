angular
.module('maps')
.controller('MapsController', function($scope, $ionicLoading, $compile, MapsService,
  $location, DependentsService, UsersService, $state, $window) {

    $scope.addPharmacy = function () {
      // console.log('new pharmacy firing!');
      var placeToSave = $scope.namePlace[$scope.namePlace.length - 1];
      // console.log(placeToSave);
      if (placeToSave === null || placeToSave === undefined) {
        $location.path('/app/userprofile');
      } else {
      MapsService.addPharmacy(placeToSave).success(function (){
        $state.go('app.userprofile');
          $window.location.reload(true);
        });
      }
    };

//***This is for the GOOGLE Map***
    $scope.namePlace = [];
    var mapPlace =[];

    $scope.$on('location:added', function() {
      // console.log("adding to namePlace array");
      var place = $scope.namePlace[$scope.namePlace.length - 1];
      $scope.address = place.address;
      $scope.name = place.name;
      $scope.phone = place.phone;
      $scope.website = place.website;
      mapPlace = place;
    });

    $scope.map = {
      center: {
        latitude: 32.8853,
        longitude: -80.0169
      },
      mapTypeControl: false,
      zoom: 10,
      marker: []
    };
    $scope.options = {
      scrollwheel: false,
      mapTypeControl: false,
    };

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
        // console.log("This is searchbox", searchBox);
      var place = searchBox.getPlaces();
        lat = place[0].geometry.location.lat();
        long = place[0].geometry.location.lng();
          if (!place || place === 'undefined' || place.length === 0) {
            return;
          }
      // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
      MapsService.getGoogleInfo(place[0].place_id).success(function(data) {
        console.log("YAY", data);
        console.log('data', lat, long, data);
        console.log(data.result.name);
        console.log(data.result.formatted_address);
        console.log(data.result.formatted_phone_number);
        console.log(data.result.website);
        // console.log(data.result.email);

        var newPlace = {
          name: data.result.name,
          address: data.result.formatted_address,
          phone: data.result.formatted_phone_number,
          website: data.result.website,
          coords: {
            latitude: place[0].geometry.location.lat(),
            longitude: place[0].geometry.location.lng()
          },
            id: place[0].place_id,
            mapurl: place[0].url,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        };
        console.log(newPlace);
        $scope.namePlace.push(newPlace);
        // console.log('scope nameplace', $scope.namePlace);
        $scope.$broadcast("location:added");
      })
      .error(function(data) {
        console.log("DAMN", data);
      });
    }
  };
  $scope.searchbox = { template:'searchbox.tpl.html', events:events};


    //////////////////////////////////
    // CHANGE event
    /////////////////////////////////

    // var searchBox = new google.maps.places.SearchBox(document.getElementsByTagName('input')[0]);
    //
    // searchBox.addEventListener('keypress', function(event) {
    //   console.log("PLACE CHANGED", event);
    //   var key = e.which || e.keyCode;
    //   if(key === 13) {
    //     console.log('pressed enter');
    //   }
    //   var place = searchBox.getPlaces()[0];
    //   console.log("PLACE FIRST", place);
    // });
    // google.maps.event.addListener(searchBox, 'places_changed', function(event) {
    //   var place = searchBox.getPlaces()[0];
    //   console.log("hello", place);
    //
    //   if (!place.geometry) return;
    //
    //   if (place.geometry.viewport) {
    //     map.fitBounds(place.geometry.viewport);
    //   } else {
    //     map.setCenter(place.geometry.location);
    //     map.setZoom(16);
    //   }
    // });
});
