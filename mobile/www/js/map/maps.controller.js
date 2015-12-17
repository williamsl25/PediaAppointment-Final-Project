angular
.module('maps')
.controller('MapsController', function($scope, $ionicLoading, $compile, MapsService, $location) {

  $scope.namePlace = [];

  $scope.addPharmacy = function (namePlace) {
    console.log('new pharmacy firing!');
    console.log(namePlace);
    MapsService.addPharmacy(namePlace);
    $location.path('/app/userprofile');
  };

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
      //  console.log('place', lat, long, place);
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
        console.log(newPlace);
        $scope.namePlace.push(newPlace);
        console.log('scope nameplace', $scope.namePlace);

    }

  };

  $scope.searchbox = { template:'searchbox.tpl.html', events:events};

  // $scope.addPharmacy = function (pharmacy) {
  //   console.log('new pharmacy firing!');
  //   console.log(pharmacy);
  //   MapsService.addPharmacy(pharmacy);
  //   $location.path('/app/userprofile');
  // };

});