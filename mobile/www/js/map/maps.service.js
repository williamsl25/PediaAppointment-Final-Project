(function () {
  "use strict";

  angular
    .module('maps')
    .factory('MapsService', function ($http) {
      var url = "https://pediaserver.herokuapp.com/api/pharmacy";
      var removeUrl = "https://pediaserver.herokuapp.com/api/collections/pharmacies";

      var addPharmacy = function (pharmacy) {
        console.log(pharmacy);
        return $http.post(url, pharmacy).then(function(data) {
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
      var deletePharmacy = function (Id) {
        return $http.delete(removeUrl + '/' + Id);
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
