// https://pediaserver.herokuapp.com/api/collections/dependents
(function () {
  "use strict";

  angular
    .module('dependents')
    .factory('DependentsService', function ($http) {
      var url = "https://pediaserver.herokuapp.com/api/dependents";
      var getDependent = "https://pediaserver.herokuapp.com/api/collections/dependents/";
      var editDependent = "https://pediaserver.herokuapp.com/api/dependents";

      var addDependent = function (newDependent) {
        // console.log("ADD DEP SERV", newDependent);
         $http.post(url, newDependent).then(function(data) {
          // console.log("ADD DEPENDENT SERVICE", data);
        });
      };

      var getDependents = function () {
        return $http.get(url);
      };

      var getSingleDependent = function (id) {
        return $http.get(getDependent + id);
      };

      var updateDependent = function (updatedDependent) {
        return $http.put(editDependent + '/' + updatedDependent._id, updatedDependent );
      };
      var removeDependent = function (deleteDependent) {
        // console.log("This is the remove dependent service firing!", deleteDependent);
        return $http.delete(editDependent + '/' + deleteDependent._id);
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
