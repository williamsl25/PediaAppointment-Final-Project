(function() {
  'use strict';

  angular
  .module('appointments')
  .controller('AppointmentsController', function ($scope, $auth, $stateParams, $ionicPopup, DependentsService, UsersService, AppointmentsService, $location){
    var vm = this;
    $scope.singleUser;


    AppointmentsService.getAppointments().success(function (appointments) {
        $scope.appointments = appointments;
      });

      UsersService.getSingleUser().success(function (singleUser) {
        console.log(singleUser);
        $scope.singleUser = singleUser;
      });



      DependentsService.getDependents().success(function (dependents) {
        var userData = $scope.singleUser._id;
        console.log('test', userData);
        $scope.dependentsArr = [];

            console.log('logging success',dependents[3].user);
            // $scope.dependents = dependents[i];
            console.log(dependents);
            for(var i = 0; i <= dependents.length; i++) {
              // console.log("this is i.user", dependents[i].user);
              console.log("this is i", i);
              if (userData === dependents[i].user){
                console.log(dependents[i].name);

                // $scope.dependentsArr.push(dependents[i].name);
                $scope.dependentsArr.push(dependents[i]);
                console.log($scope.dependentsArr);

                // return dependents[i];

            }else {
                console.log("User does not have dependents");
            }
          }

        });




      $scope.newAppointment = function (appointment) {
        console.log('new appointment firing!');
        // console.log(appointment);
        // console.log(appointment.fever)
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
