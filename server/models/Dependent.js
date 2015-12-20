var mongoose = require('mongoose');
var User = require('../models/User');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var dependentSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  name: String,
  dob: Date,
  medication: String,
  history: String,
  pediatrician: String,
  pedAddress: String,
  pedPhone: String,
  pedWeb: String
  // pediatrician: [{
  //   name: String,
  //   address: String,
  //   phone: String,
  //   website: String
  // }]
});

var Dependent = mongoose.model('Dependent', dependentSchema);

module.exports = Dependent;
