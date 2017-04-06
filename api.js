const express = require("express");
const User = require('./usermodel');


const router = express.Router();

// get a list of users from the db
router.get('/users', function (req, res) {
    res.send({ type: 'GET' });
});

// add a new user to the db
router.post('/user', function (req, res) {
    User.create(req.body).then(function (user) {
        res.send(user);
        console.log("boom goes the dynamite");
    });
});

// update a user in the db
router.put('/users/:id', function (req, res) {
    res.send({ type: 'PUT' });
});

// delete a user from the db
router.delete('/users/:id', function (req, res) {
    res.send({ type: 'DELETE' });
});

module.exports = router;