var express = require('express');
var router = express.Router();
var config = require('../config');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var mongoose = require('mongoose');
var Any = mongoose.Schema({}, {"strict": false});


router.param('collectionName', function (req, res, next, collectionName) {
     req.collection = mongoose.model(collectionName, Any);
    next();
});


// var url = https://pediaserver.herokuapp.com/api/collections/myDependents

// api/collections/:collectionName
router.route('/:collectionName')
    .get(function (req, res, next) {
      console.log("This is the /:collectionName route Firing");
       req.collection.find({},function(e, results) {

           if (e) return next(e);

           res.status(200).send({msg: "Sending collection"},results);
       });

    })
    .post(ensureAuthenticated, function (req, res, next) {

        var newPost = req.collection(req.body);
        newPost.save(function () {
            res.status(200).send({msg: "it works"});
        });

    });


// /api/collections/:collectionName/:id
router.route('/:collectionName/:id')
    .get(function (req, res, next) {
      console.log("This is the /:collectionName/:ID route firing in the GET request:");
      console.log("This is the /:collectionName/:id request param ID", req.params.id);
        req.collection.findById(req.params.id, function (e, result) {
            if(e) return next(e);
            res.json(result);
            // res.status(200).send({msg: "sending single dependent"},result);
        });
    })
    .put(ensureAuthenticated, function (req, res) {
        delete req.body._id;
        req.collection.update(req.params.id, {$set: req.body}, function (e, result) {
            res.status(200).send({msg: "Sending collection/:id"},result);
            // res.status(200).json({msg: "Sending collection/:id"},result);

        });

    })
    .delete(ensureAuthenticated, function (req, res, next) {
        req.collection.findById(req.params.id, function (e, result) {
            if(e) return next(e);
            result.remove(function () {
                res.status(200).send({msg: 'Item Deleted'});
            });

        });
    });

module.exports = router;
