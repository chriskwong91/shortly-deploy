var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.compare = function(attemptedPassword, callback) {

  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {

    callback(isMatch);
  });
};

userSchema.methods.hash = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
