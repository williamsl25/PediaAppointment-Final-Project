(function () {
  "use strict";

  angular
    .module('appointments')
    .factory('AppointmentsService', function ($http) {
      // var url = "https://tiny-tiny.herokuapp.com/collections/PediaAppAppointments";
      var url = "https://pediaserver.herokuapp.com/api/collections/PediaAppAppointments";
      // var url = "api/collections/PediaAppAppointments";

      var addAppointment = function (newAppointment) {
        console.log(newAppointment);
        $http.post(url, newAppointment);
      };

      var getAppointments = function () {
        return $http.get(url);
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
        getAppointments: getAppointments
      };
    });

})();
