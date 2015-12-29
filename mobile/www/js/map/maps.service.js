(function () {
  "use strict";

  angular
    .module('maps')
    .factory('MapsService', function ($http) {
      var url = "https://pediaserver.herokuapp.com/api/pharmacy";
      // var url = "api/collections/PediaAppPharmacy";
      // var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppPharmacy";
      var addPharmacy = function (pharmacy) {
        console.log(pharmacy);
        $http.post(url, pharmacy).then(function(data) {
          console.log("ADD PHARMACY SERVICE", data);
        });
      };

      var getPharmacy = function() {
        console.log("Get Pharmacy is firing from maps service");
        return $http.get(url);
      };

      // var getDependents = function () {
      //   return $http.get(url);
      // };
      //
      // var getSingleDependent = function (dependentId) {
      //   return $http.get(url + '/' + dependentId);
      // };
      //
      var deletePharmacy = function (dependentId) {
        return $http.delete(url + '/' + dependentId);
      };



      return {
        addPharmacy: addPharmacy,
        getPharmacy: getPharmacy,
        // getSingleDependent: getSingleDependent,
        deletePharmacy: deletePharmacy,
        // updateDependent: updateDependent,
        // getDependents: getDependents
      };
    });

})();
