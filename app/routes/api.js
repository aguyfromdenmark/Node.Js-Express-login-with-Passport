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
    // get a list of users from the db
    router.get('/', function (req, res) {
        res.send({ message: "Velkomen, call /login to login!" });
    });

    router.get('/login', function (req, res) {
        res.send({ message: "This is the login page, post to this to login!" });
    });

    router.get('/signup', function (req, res) {
        res.send({ message: "This is the singp page, post to this to signup" });
    });

    router.get('logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/weather', isLoggedIn, function (req, res) {
        User.findOne({ user: req.query.username }).then(function (user) {
            console.log("Logged innnnnnnn");
            res.send(user);
        });
    });

    router.post('/login', passport.authenticate('login', {
		successRedirect: '/api/weather',
		failureRedirect: '/',
    }));

    // add a new user to the db
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/api/weather', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error

    }));

    // update a user in the db
    router.put('/users/:id', function (req, res) {
        res.send({ type: 'PUT' });
    });

    // delete a user from the db
    router.delete('/users/:id', function (req, res) {
        res.send({ type: 'DELETE' });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }

    return router;
}