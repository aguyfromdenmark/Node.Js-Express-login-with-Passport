const express = require('express');
const passport = require('passport');
const path = require('path');
const User = require('../models/usermodel');

const router = express.Router();

module.exports = function (passport) {

    router.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,'../../','public/index.html'));  
    });

    router.get('/login', function (req, res) {
        res.sendFile(path.join(__dirname,'../../','public/login.html'));
    });

    router.get('/signup', function (req, res) {
        res.sendFile(path.join(__dirname,'../../','public/signup.html')); //__dirname er stien til den mappe hvor denne fil er i, derefter går man to levels tilbae, og så ind i public osv...
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.post('/login', passport.authenticate('login', {
		successRedirect: '/api/weather',
		failureRedirect: '/signup',
    }));

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/api/weather', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error

    }));

    router.put('/users/:id', function (req, res) {
        res.send({ type: 'PUT' });
    });

    router.delete('/users/:id', function (req, res) {
        res.send({ type: 'DELETE' });
    });

    return router;
}