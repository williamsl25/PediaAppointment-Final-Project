var mongoose = require('mongoose');
var User = require('../models/User');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var pharmacySchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  name: String,
  address: String,
  phone: String,
  website: String
});

var Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;

//
