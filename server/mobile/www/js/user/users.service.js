(function () {
  "use strict";

  angular
    .module('users')
    .factory('UsersService', function ($http) {
      var url = "https://pediaserver.herokuapp.com/auth/signup";
      var getUser = "https://pediaserver.herokuapp.com/api/me";
      var updateMe = "https://pediaserver.herokuapp.com/api/me"
      var addUser = function (newUser) {
        console.log(newUser);
        $http.post(url, newUser).then(function(res){
          console.log(res);
        });
      };

      var getUsers = function () {
        return $http.get(url);
      };

      var getSingleUser = function () {
        return $http.get(getUser);
      };

      var updateUser = function (updatedUser) {
        return $http.put(updateMe, updatedUser);
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
      };
    });

})();
