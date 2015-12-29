(function () {
  "use strict";

  angular
    .module('appointments')
    .factory('AppointmentsService', function ($http) {
      // var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppAppointments";
      var url = "https://pediaserver.herokuapp.com/api/appointment";
      // var url = "api/collections/appointment";

      var addAppointment = function (newAppointment) {
        console.log(newAppointment);
        $http.post(url, newAppointment).then(function(data){
          console.log("add APPOINTMENT SERVICE", data);
        });
      };


      var getAppointments = function () {
        return $http.get(url);
      };

      var getSingleDependent = function (id) {
        console.log("this is getsingledependent in dependent service:", id);
        console.log("getsingledependent service is firing!");
        return $http.get(getDependent + id);
      };

      var updateAppointment = function (updatedAppointment) {
        return $http.put(url + '/' + updatedAppointment._id, updatedAppointment);
      };
      var removeAppointment = function (appointmentId) {
        return $http.delete(url + '/' + appointmentId);
      };



      return {
        addAppointment: addAppointment,
        removeAppointment: removeAppointment,
        updateAppointment: updateAppointment,
        getAppointments: getAppointments,
        getSingleDependent: getSingleDependent
      };
    });

})();
