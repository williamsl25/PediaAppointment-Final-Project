var mongoose = require('mongoose');
var User = require('../models/User');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var pharmaciesSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  name: String,
  address: String,
  phone: String,
  website: String
});

var Pharmacies = mongoose.model('Pharmacies', pharmaciesSchema);

module.exports = Pharmacies;
