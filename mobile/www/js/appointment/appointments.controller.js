(function() {
  'use strict';

  angular
  .module('appointments')
  .controller('AppointmentsController', function ($scope, $stateParams, $ionicPopup, DependentsService, UsersService, AppointmentsService, $location){
    var vm = this;
    AppointmentsService.getAppointments().success(function (appointments) {
        $scope.appointments = appointments;
      });
      $scope.newAppointment = function (appointment) {
        console.log('new appointment firing!');
        AppointmentsService.addAppointment(appointment);
        $location.path('/app/confirmation');
      };
      vm.title = "this is add appointment - calvin";
      $scope.editAppointment = function (editedAppointment) {
        AppointmentsService.updateAppointment(editedAppointment);
      };
      $scope.deleteAppointment = function (appointmentId) {
        AppointmentsService.removeAppointment(appointmentId);
      };

      // This is for the date picker

      // $scope.datepickerObject.inputDate = new Date();
      $scope.currentDate = new Date();

      $scope.datepickerObjectPopup = {

        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Save', //Optional
        errorMsgLabel : 'Please select time.', //Optional
        setButtonType : 'button-positive', //Optional
        modalHeaderColor:'bar-positive', //Optional
        modalFooterColor:'bar-positive', //Optional
        templateType:'popup', //Optional

        mondayFirst: true, //Optional
        // disabledDates:disabledDates, //Optional
        monthList:["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"], //Optional
        from: new Date(2016, 1, 1), //Optional
        to: new Date(2018, 1, 1), //Optional
        callback: function (val) { //Optional
          $scope.datePickerCallbackPopup(val);
        }
      };

      $scope.datePickerCallbackPopup = function (val) {
        if (typeof(val) === 'undefined') {
          console.log('No date selected');
        } else {
          $scope.datepickerObjectPopup.inputDate = val;
          console.log('Selected date is : ', val);
        }
      };

  });

}());
