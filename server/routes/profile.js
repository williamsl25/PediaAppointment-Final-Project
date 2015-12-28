var express = require('express');
var router = express.Router();
var User = require('../models/User');
var config = require('../config');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var role = require('./roles');
var Dependent = require('../models/Dependent');
var Pharmacies = require('../models/Pharmacies');
var ObjectId = require('mongoose').Types.ObjectId;

// GET /api/me
router.route('/me')
  .all(ensureAuthenticated)
  .get(function(req, res) {
    User.findById(req.user, function(err, user) {
      console.log(user);
      res.send(user);
    });
  })
// PUT /api/me
  .put(function(req, res) {

    User.findById(req.user, function(err, user) {
      console.log(user);
      console.log(req);
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      user.name = req.body.name || user.name;
      user.phone= req.body.phone || user.phone;
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
      console.log ("get name of user", req.body.name);
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
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

// Dependent Route
router.route('/dependents')
  .get(function(req,res) {
    Dependent.find({'user._id': req.user}, function(err, dependents) {
      console.log("This is the route GET /dependents firing!");
      console.log("FOUND DEPS", dependents);
      if(!dependents)  { return res.status(400).send({ message: 'User not found / No Dependents' }); }
      res.status(200).send(dependents);
    });
  })
  .post(ensureAuthenticated, function (req, res, next) {
    console.log("POST IN DEPENDENT FIRING", req.user);
    var dependent = new Dependent({
      user: req.user,
      name: req.body.name,
      dob: req.body.dob,
      history: req.body.history,
      medication: req.body.medication,
      pediatrician: req.body.pediatricianName,
      pedAddress: req.body.peditricianAddress,
      pedPhone: req.body.peditricianPhone,
      pedWeb: req.body.pediatricianWebsite
    });

    console.log('new Dependent', dependent);
    dependent.save(function (err,dependent) {
      console.log("err", err);
      if(err) return next(err);
        res.status(200).send({msg: "it works"});
    });
  });

//test
  router.route('/dependents/:id')
    // .all(ensureAuthenticated, role.can('access all the things'))
    .get(function (req, res) {

      console.log("This is the entire request body:", req.body);
      console.log("This is the entire request params:", req.params);

      Dependent.findById(req.params.dependentId, function (err, dependent) {
        console.log("This is the route GET /dependents/dependentID firing!");
        console.log("This is the request id:", req.id);
        console.log("This is the dependent:", req.params.dependent);
        console.log("This is the name:", req.params.name, req.body.name);
        console.log("This is the user:", req.user);
        console.log("This is the entire request body:", req.body);
        console.log("This is the entire request params:", req.params);





        if (!dependent) { return res.status(400).send({ message: 'Dependent not found' }); }
        res.status(200).send(dependent);


      });
    })
    .put(function (req, res) {
    Dependent.findById(req.params.dependentId, function (err, dependent) {
      if (!dependent) { return res.status(400).send({ message: 'Dependent not found' }); }
      console.log ("Post in Single Dependent FIRING!", req.body.name);
      dependent.name = req.body.name || dependent.name;
      dependent.dob = req.body.dob || dependent.dob;
      dependent.history = req.body.history || dependent.history;
      dependent.medication = req.body.medication || dependent.medication;
      dependent.pediatrician = req.body.pediatrician || dependent.pediatrician;
      dependent.save(function(err) {
        res.status(200).end();
      });
    });
  })
  .delete(function (req, res) {
    Dependent.findByIdAndRemove(req.params.dependentId, function (err, dependent) {
      if(err) { return next(err); }
      res.status(200).send({message: 'Successfuly Deleted Dependent'});
    });
  });


//Pharmacy route
  router.route('/pharmacy')
    .get(function(req,res) {
      Pharmacies.find({'user._id': req.user}, function(err, pharmacies) {
        console.log("FOUND PHARMACY", pharmacies);
        if(!pharmacies)  { return res.status(400).send({ message: 'Pharmacy Not Found / No Pharmacy on File' }); }
        res.status(200).send(pharmacies);
      });
    })
    .post(ensureAuthenticated, function (req, res, next) {
      console.log("POST IN PHARMACY", req.user);
      var pharmacies = new Pharmacies({
        user: req.user,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        website: req.body.website,
        // pediatrician: req.body.pediatricianName,
        // pedAddress: req.body.peditricianAddress,
        // pedPhone: req.body.peditricianPhone,
        // pedWeb: req.body.pediatricianWebsite
      });

      console.log('new Pharmacy', pharmacies);
      pharmacies.save(function (err,pharmacies) {
        console.log("err", err);
        if(err) return next(err);
          res.status(200).send({msg: "it works"});
      });
    });



module.exports = router;
