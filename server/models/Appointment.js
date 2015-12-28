var mongoose = require('mongoose');
var User = require('../models/User');
var Dependent = require('../models/Dependent');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var appointmentSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  dependent: { type: ObjectId, ref: 'Dependent'},
  name: String,
  fever: String,
  nausea: String,
  rash: String,
  cough: String,
  sorethroat: String,
  diarrhea: String,
  otherSymptoms: String,
  date: Date,
  firstAvailable: String,
  morning: String,
  afternoon: String,
  comments: String

});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
