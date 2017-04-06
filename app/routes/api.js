const express = require('express');
const passport = require('passport');
const User = require('../models/usermodel');

const router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function (passport) {

    router.get('/weather', isAuthenticated, function (req, res) {
        User.findOne({ user: req.query.username }).then(function (user) {
            res.send(user);
        });
    });

    return router;
}