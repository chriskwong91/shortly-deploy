//var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var urlSchema = new mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
});



urlSchema.methods.shorten = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  // return shasum.digest('hex').slice(0, 5);
};

// urlSchema.pre('save', function(model) {

//   console.log('post init doc', this);
//   this.shorten();  
//   console.log('post init doc', this);
// });



var Link = mongoose.model('Link', urlSchema);


module.exports = Link;


