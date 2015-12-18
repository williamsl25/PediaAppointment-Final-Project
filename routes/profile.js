var express = require('express');
var router = express.Router();
var User = require('../models/User');
var config = require('../config');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var role = require('./roles');
var Dependent = require('../models/Dependent');
var ObjectId = require('mongoose').Types.ObjectId;

// GET /api/me
router.route('/me')
  .all(ensureAuthenticated)
  .get(function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  })
// PUT /api/me
  .put(function(req, res) {
    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      user.displayName = req.body.displayName || user.displayName;
      user.email = req.body.email || user.email;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });

router.param('userId', function (req, res, next, userId) {
  next();
});

// admin
router.route('/admin/users')
  .all(ensureAuthenticated, role.can('access all the things'))
  .get(function (req, res) {
    User.find({}, function (err, users) {
      if (err) { return res.status(400).send({ message: 'Users not found' }); }

      res.status(200).send(users);
    });
  });
router.route('/admin/users/:userId')
  .all(ensureAuthenticated, role.can('access all the things'))
  .get(function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (!user) { return res.status(400).send({ message: 'User not found' }); }
      res.status(200).send(user);
    });
  })
  .put(function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (!user) { return res.status(400).send({ message: 'User not found' }); }
      user.displayName = req.body.displayName || user.displayName;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  })
  .delete(function (req, res) {
    User.findByIdAndRemove(req.params.userId, function (err, user) {
      if(err) { return next(err); }
      res.status(200).send({message: 'Successfuly Deleted User'});
    });
  });

router.route('/dependents')
  .get(function(req,res) {
    Dependent.find({'user._id': req.user}, function(err, dependents) {
      console.log("FOUND DEPS", dependents);
      if(!dependents)  { return res.status(400).send({ message: 'User not found / No Dependents' }); }
      res.status(200).send(dependents);
    });
  })
  .post(ensureAuthenticated, function (req, res, next) {
    console.log("POST IN DEPENDENT", req.user);
    var dependent = new Dependent({
      user: req.user,
      name: req.body.name,
      dob: req.body.dob,
      history: req.body.history,
      medication: req.body.medication,
      pediatrician: req.body.pediatricianName,
      pedAddress: req.body.pedAddress,
      pedPhone: req.body.pedPhone,
      pedWeb: req.body.website
    });

    console.log('new Dependent', dependent);
    dependent.save(function (err,dependent) {
      console.log("err", err);
      if(err) return next(err);
        res.status(200).send({msg: "it works"});
    });
  });

  //Dependent Routes

module.exports = router;
