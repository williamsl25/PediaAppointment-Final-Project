// https://pediaserver.herokuapp.com/api/collections/dependents
(function () {
  "use strict";

  angular
    .module('dependents')
    .factory('DependentsService', function ($http) {
      // var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppDependents";
      var url = "https://pediaserver.herokuapp.com/api/dependents";
      var getDependent = "https://pediaserver.herokuapp.com/api/dependents/:dependentId";
      var editDependent = "https://pediaserver.herokuapp.com/api/dependents/:dependentId";

      // var url = "/api/dependents";

      var addDependent = function (newDependent) {
        console.log("ADD DEP SERV", newDependent);
        $http.post(url, newDependent).then(function(data) {
          console.log("ADD DEPENDENT SERVICE", data);
        });
      };


      var getDependents = function () {
        return $http.get(url);
      };

      var getSingleDependent = function (dependentId) {
        console.log("this is dependent service", dependentId);
        return $http.get(getDependent);
      };

      var updateDependent = function (updatedDependent) {
        return $http.put(editDependent, updatedDependent);
      };
      var removeDependent = function (dependentId) {
        return $http.delete(url + '/' + dependentId);
      };




      return {
        addDependent: addDependent,
        getSingleDependent: getSingleDependent,
        removeDependent: removeDependent,
        updateDependent: updateDependent,
        getDependents: getDependents
      };
    });

})();
