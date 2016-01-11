(function() {
  'use strict';

  angular
  .module('appointments')
  .controller('AppointmentsController', function ($scope, $auth, $stateParams, $location, $state, $ionicPopup,
    UsersService, DependentsService, AppointmentsService, MapsService, userId, $cordovaCalendar){

    $scope.singleuserArr = [];
    var pickerVal = "";
    var selectedDependent = "";

    $scope.confirmedDate = Date.parse(localStorage.getItem('pickerVal'));
    console.log("This is the date from local storage", $scope.confirmedDate);

    $scope.dependentFromAppt = localStorage.getItem('selectedDependent');
    console.log("This is the date from local storage", $scope.dependentFromAppt);



    UsersService.getSingleUser().success(function (singleUser) {
      // console.log(singleUser);
      $scope.singleuserArr = singleUser;
      // console.log("This is the singleuserArr", $scope.singleuserArr);
    });

    DependentsService.getDependents().success(function (dependents) {
      var userData = userId;
      // console.log('test', userData);
      $scope.dependentsArr = [];
      // console.log(dependents);
          for(var i = 0; i <= dependents.length; i++) {
            // console.log("this is i.user", dependents[i].user);
            if (userData === dependents[i].user){
              // console.log(dependents[i].name);
              // $scope.dependentsArr.push(dependents[i].name);
              $scope.dependentsArr.push(dependents[i]);
              // console.log($scope.dependentsArr);
              // return dependents[i];
            }else {
              // console.log("User does not have dependents");
            }
          }
    });

      AppointmentsService.getAppointments().success(function (appointments) {
            $scope.apptArr = [];
            $scope.apptToDisplay = [];
            // console.log($scope.apptArr);
            // console.log('this is singleuserArr in get Appointments', $scope.singleuserArr);
            // console.log('get appointments for this logged in user',$scope.singleuserArr._id);
            var appointmentUser = userId;
            // console.log('this is the get appointment data user', appointmentUser);
            // console.log("These are all the appointments to loop over", appointments);
            // console.log('logging an appointment success',appointments[1]);
                // $scope.dependents = dependents[i];
                // console.log(dependents);
                for(var i = 0; i <= appointments.length; i++) {
                  // console.log("this is i", i);
                  if (appointmentUser === appointments[i].user){
                    // console.log(appointments[i].fever);
                    // console.log(appointments[i]._id);
                    // return dependents[i];
                    // dependentsArr.push(dependents[i].name);
                    $scope.apptArr.push(appointments[i]);
                    // console.log("These are the appointments for the logged in user",$scope.apptArr);
                    $scope.apptToDisplay = $scope.apptArr[$scope.apptArr.length - 1];
                    // console.log("This is the appt to display", $scope.apptToDisplay);
                    // console.log($scope.apptToDisplay.comments);

                }else {
                    console.log("User does not have any appointments");
                }
              }
        });

        MapsService.getPharmacy().success(function (pharmacy) {
          // console.log("Pharmacy from users controller:",pharmacy);
          var pharmacyId = userId;
          // console.log("This is scope.singleuserArr._id:", $scope.singleuserArr._id);
          // console.log(pharmacyId);
          $scope.pharmacyArr = [];
          // $scope.pharmacy = pharmacy;
            for(var i = 0; i <= pharmacy.length; i++) {
              // console.log("this is pharmacy i", i);
              if (pharmacyId === pharmacy[i].user){
                // console.log(pharmacy[i].name);
                // console.log(pharmacy[i]._id);
                // pharmacyArr.push(pharmacy[i].name);
                $scope.pharmacyArr.push(pharmacy[i]);
                // console.log($scope.pharmacyArr);
            }else {
                console.log("User does not have a current pharmacy on file");
                }
            }
      });

      $scope.clickedDependent = function (dependentName) {
        localStorage.setItem("selectedDependent", dependentName);
        // selectedDependent = dependent;
        console.log("This is the selectedDependent:", dependentName);
      };

      $scope.newAppointment = function (appointment) {
        // console.log('new appointment firing!');
        // console.log(appointment);
        // console.log(appointment);
        // console.log(appointment.fever)
        AppointmentsService.addAppointment(appointment);
        $ionicPopup.alert({
          title: 'Appointment Request Sent'
        });
          $state.go('app.confirmation');
      };

      $scope.deleteAppointment = function (appointmentId) {
        AppointmentsService.removeAppointment(appointmentId);
      };

      // This is for the date picker
      // $scope.pickerVal = "";
      $scope.currentDate = new Date();
      // $scope.inputDate = new Date();

      $scope.datepickerObjectPopup = {
        inputDate: new Date(),
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Save', //Optional
        errorMsgLabel : 'Please select time.', //Optional
        setButtonType : 'button-positive datePickerSave', //Optional
        modalHeaderColor:'bar-positive', //Optional
        modalFooterColor:'bar-positive', //Optional
        templateType:'popup', //Optional
        mondayFirst: true, //Optional
        // weekNames:["M", "T", "W", "TH", "F"],
        // yearsList: [2016, 2017, 2018, 2019, 2020],
        // disabledDates:disabledDates, //Optional
        monthList:["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"], //Optional
        from: new Date(2015, 1, 1), //Optional
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
          localStorage.setItem("pickerVal", val);
          // console.log(dateChosen);
          // pickerVal = val;
          $scope.inputDate = val;
          // console.log($scope.val);
          // console.log(pickerVal);
          // $scope.datepickerObjectPopup.inputDate = new Date();
          console.log('Selected date is : ', val);
        }
      };

      //This is for the Add to calendar in ios - Calendar PhoneGap plugins
    $scope.addToCalendar = function() {
      console.log("new event is being created with cordova calendar");
    // $cordovaCalendar.createEvent({
    $cordovaCalendar.createEventInteractively({
        title: 'Pediatric Appointment Today',
        location: 'Doctors Office',
        notes: 'This appointment was taken from PediaAppointment',
        startDate: new Date(2016, 0, 8, 15, 30, 0, 0, 0),
        endDate: new Date(2016, 0, 8, 16, 30, 0, 0, 0)
    }).then(function (result) {
        console.log("Event created successfully");
    }, function (err) {
        console.error("There was an error: " + err);
    });
};


      // $scope.onSuccess = function (msg) {
      //   alert('Calendar success: ' + JSON.stringify(msg));
      // };
      //
      // $scope.onError = function (msg) {
      //   alert('Calendar error: ' + JSON.stringify(msg));
      // };

  });
}());
