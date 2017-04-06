const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create user Schema & model
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    pass: {
        type: String,
        required: [true, 'Name field is required']
    }   
});
//TODO add correct user info + valiadtion/auth

const User = mongoose.model('user', UserSchema);

module.exports = User;