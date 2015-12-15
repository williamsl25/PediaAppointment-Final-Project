(function () {
  "use strict";

  angular
    .module('users')
    .factory('UsersService', function ($http) {
      var url = "http://tiny-tiny.herokuapp.com/collections/PediaApp";
      // var urlForLocal = "/api/collections/PediaApp"
      //The functions below would then go to the server side??
      
      var addUser = function (newUser) {
        console.log(newUser);
        $http.post(url, newUser).then(function (res){
          console.log(res);
        });
      };

      var getUsers = function () {
        return $http.get(url);
      };

      var getSingleUser = function (userId) {
        return $http.get(url + '/' + userId);
      };

      var updateUser = function (updatedUser) {
        return $http.put(url + '/' + updatedUser._id, updatedUser);
      };
      var removeUser = function (userId) {
        return $http.delete(url + '/' + userId);
      };



      return {
        addUser: addUser,
        getSingleUser: getSingleUser,
        removeUser: removeUser,
        updateUser: updateUser,
        getUsers: getUsers
      }
    })

})();
