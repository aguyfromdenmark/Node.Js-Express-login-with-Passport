const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/assignment1");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});

app.listen(process.env.port || 4000,function(){
    console.log('The server is now listening for requests');
});