const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


// create user Schema & model
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    }   
});
//TODO add correct user info + valiadtion/auth

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;