(function () {
  "use strict";

  angular
    .module('dependents')
    .factory('DependentsService', function ($http) {
      // var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppDependents";
      var url = "https://pediaserver.herokuapp.com/api/dependents";
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
        return $http.get(url + '/' + dependentId);
      };

      var updateDependent = function (updatedDependent) {
        return $http.put(url + '/' + updatedDependent._id, updatedDependent);
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
