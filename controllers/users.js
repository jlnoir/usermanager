var express = require('express')
  , router = express.Router()
  , User = require('../models/user.js');

// Define routes handling profile requests
router.get('/', function(req, res) {
    res.render("users");
});

router.post('/', function(req, res) {
    User.create(req.body, function (err, post) {
        console.log(req.body);
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/all', function(req, res) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.get('/:id', function(req, res) {
    User.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;