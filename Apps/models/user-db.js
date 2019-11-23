var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    user_name: String,
    password: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;