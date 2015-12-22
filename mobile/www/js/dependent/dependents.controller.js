(function() {
  'use strict';

  angular
  .module('dependents')
  .controller('DependentsController', function ($scope, $stateParams, DependentsService, UsersService, $location, MapsService,$ionicLoading, $compile){



    $scope.namePlace = [];
    var mapPlace =[];

    // $scope.addPharmacy = function () {
    //   console.log('new pharmacy firing!');
    //   var placeToSave = $scope.namePlace[$scope.namePlace.length - 1];
    //   console.log(placeToSave);
    //   if (placeToSave === null || placeToSave === undefined) {
    //     $location.path('/app/userprofile');
    //   } else {
    //   MapsService.addPharmacy(placeToSave);
    //   $location.path('/app/userprofile');
    //   }
    // };

    $scope.$on('location:added', function() {
      console.log("adding to namePlace array");
      var dependent = $scope.namePlace[$scope.namePlace.length - 1];
      $scope.address = dependent.address;
      $scope.name = dependent.name;
      $scope.phone = dependent.phone;
      $scope.website = dependent.website;
      mapPlace = dependent;

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
  var place = searchBox.getPlaces();
      var lat = place[0].geometry.location.lat();
      var long = place[0].geometry.location.lng();
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
          console.log(newPlace);
          $scope.namePlace.push(newPlace);
          console.log('scope nameplace', $scope.namePlace);

          $scope.$broadcast("location:added");

      }

    };

    $scope.searchbox = { template:'searchbox.tpl.html', events:events};


      $scope.newDependent = function (dependent) {
        console.log('new dependent firing!', dependent);
        DependentsService.addDependent(dependent);
        $location.path('/app/userprofile');
      };
      // vm.title = "this is add dependent - calvin";
      $scope.editDependent = function (editedDependent) {
        console.log(editedDependent);
        DependentsService.updateDependent(editedDependent).success(function() {
          console.log("EDIT",editedDependent);
          $location.path('/app/userprofile');
          $scope.dependent = dependent;
        });
      };

      $scope.$on('user:edited', function () {

      });

      $scope.gotoeditDependent = function (id) {
        DependentsService.getSingleDependent(id).success(function (dependent){
          console.log(dependent);
          $scope.dependent = dependent;
          $location.path('/app/userprofile/dependent/'+ id + '/edit');
        });
      };
      $scope.deleteDependent = function (dependentId) {
        DependentsService.removeDependent(dependentId);
      };
      // $scope.gotodependentProfile = function (id) {
      //   DependentsService.getSingleDependent(id).success(function (dependent){
      //     console.log(dependent);
      //     $scope.dependent = dependent;
      //     $location.path('/app/userprofile/dependent/{{dependent._id}}');
      //   });
      // };






});

}());
