const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/assignment1");
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({ secret: 'verySecretSecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var initPassport = require('./app/passport/init');
initPassport(passport);

var routes = require('./app/routes/api')(passport);
app.use('/api', routes);

/*app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});*/

app.listen(process.env.port || 4000, function () {
    console.log('The server is now listening for requests');
});