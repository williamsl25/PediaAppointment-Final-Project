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

//     $scope.disableTap = function(){
//         console.log("disable Tab is firing");
//         container = document.getElementsById('.googleMap');
//         // disable ionic data tab
//         angular.element(container).attr('data-tap-disabled', 'true');
//         // leave input field if google-address-entry is selected
//         angular.element(container).on("click", function(){
//           document.getElementById('#searchBar').blur();
//   });
// };

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
        console.log("This is searchbox", searchBox);
      var place = searchBox.getPlaces();
        lat = place[0].geometry.location.lat();
        long = place[0].geometry.location.lng();
          if (!place || place === 'undefined' || place.length === 0) {
            return;
          }
       console.log('place', lat, long, place);
      //  console.log(place[0].name);
      //  console.log(place[0].formatted_address);
      //  console.log(place[0].formatted_phone_number);
      //  console.log(place[0].website);
      //  console.log(place[0].email);


      var newPlace = {
        name: place[0].name,
        address: place[0].formatted_address,
        phone: place[0].formatted_phone_number,
        website: place[0].website,
        coords: {
          latitude: place[0].geometry.location.lat(),
          longitude: place[0].geometry.location.lng()
        },
          id: place[0].place_id,
          mapurl: place[0].url,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      };
        // console.log(newPlace);
        $scope.namePlace.push(newPlace);
        // console.log('scope nameplace', $scope.namePlace);
        $scope.$broadcast("location:added");
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
