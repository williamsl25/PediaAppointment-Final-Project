(function () {
  "use strict";

  angular
    .module('maps')
    .factory('MapsService', function ($http) {
      // var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppMapInfo";

      var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppPharmacy";
      var addPharmacy = function (pharmacy) {
        console.log(pharmacy);
        $http.post(url, pharmacy);
      };

      // var getDependents = function () {
      //   return $http.get(url);
      // };
      //
      // var getSingleDependent = function (dependentId) {
      //   return $http.get(url + '/' + dependentId);
      // };
      //
      // var updateDependent = function (updatedDependent) {
      //   return $http.put(url + '/' + updatedDependent._id, updatedDependent);
      // };
      var deletePharmacy = function (dependentId) {
        return $http.delete(url + '/' + dependentId);
      };



      return {
        addPharmacy: addPharmacy,
        // getSingleDependent: getSingleDependent,
        deletePharmacy: deletePharmacy,
        // updateDependent: updateDependent,
        // getDependents: getDependents
      };
    });

})();
