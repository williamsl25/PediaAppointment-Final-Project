(function() {
  'use strict';

  angular
  .module('appointments')
  .controller('AppointmentsController', function ($scope, $auth, $stateParams, $location, $state, $ionicPopup,
    UsersService, DependentsService, AppointmentsService, MapsService){

    $scope.singleuserArr = [];

    UsersService.getSingleUser().success(function (singleUser) {
      console.log(singleUser);
      $scope.singleuserArr = singleUser;
      console.log("This is the singleuserArr", $scope.singleuserArr);
    });

    DependentsService.getDependents().success(function (dependents) {
      var userData = $scope.singleuserArr._id;
      console.log('test', userData);
      $scope.dependentsArr = [];
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

    // AppointmentsService.getAppointments().success(function (appointments) {
    //     $scope.appointments = appointments;
    //     console.log(appointments);
      // });

      AppointmentsService.getAppointments().success(function (appointments) {
            $scope.apptArr = [];
            $scope.apptToDisplay = [];
            // console.log($scope.apptArr);
            console.log('this is singleuserArr in get Appointments', $scope.singleuserArr);
            console.log('get appointments for this logged in user',$scope.singleuserArr._id);
            var appointmentUser = $scope.singleuserArr._id;
            console.log('this is the get appointment data user', appointmentUser);
            console.log("These are all the appointments to loop over", appointments);
            // console.log('logging an appointment success',appointments[1]);
                // $scope.dependents = dependents[i];
                // console.log(dependents);
                for(var i = 0; i <= appointments.length; i++) {
                  console.log("this is i", i);
                  if (appointmentUser === appointments[i].user){
                    console.log(appointments[i].fever);
                    console.log(appointments[i]._id);
                    // return dependents[i];
                    // dependentsArr.push(dependents[i].name);
                    $scope.apptArr.push(appointments[i]);
                    console.log("These are the appointments for the logged in user",$scope.apptArr);
                    // $scope.apptToDisplay = $scope.apptArr[$scope.apptArr.length - 1];
                    // console.log("This is the appt to display", $scope.apptToDisplay);
                    // console.log($scope.apptToDisplay.comments);

                }else {
                    console.log("User does not have any appointments");
                }
              }
        });

        MapsService.getPharmacy().success(function (pharmacy) {
          console.log("Pharmacy from users controller:",pharmacy);
          var pharmacyId = $scope.singleuserArr._id;
          console.log("This is scope.singleuserArr._id:", $scope.singleuserArr._id);
          console.log(pharmacyId);
          $scope.pharmacyArr = [];
          // $scope.pharmacy = pharmacy;
            for(var i = 0; i <= pharmacy.length; i++) {
              console.log("this is pharmacy i", i);
              if (pharmacyId === pharmacy[i].user){
                console.log(pharmacy[i].name);
                console.log(pharmacy[i]._id);
                // pharmacyArr.push(pharmacy[i].name);
                $scope.pharmacyArr.push(pharmacy[i]);
                console.log($scope.pharmacyArr);
            }else {
                console.log("User does not have a current pharmacy on file");
                }
            }
      });

      $scope.newAppointment = function (appointment) {
        console.log('new appointment firing!');
        console.log(appointment);
        // console.log(appointment);
        // console.log(appointment.fever)
        AppointmentsService.addAppointment(appointment);
        $ionicPopup.alert({
          title: 'Appointment request has been sent'
        });
          $state.go('app.confirmation');
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
