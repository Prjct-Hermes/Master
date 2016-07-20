var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
Schema = mongoose.Schema;
var schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  phone: {
    type: Number,
    required: false,
    index: false,
  },
  password: {
    type: String,
    required: true,
    index: true,
  },
  createDate: {
    type: String,
    required: false,
    index: false,
  }
});

schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

schema.methods.verifyPassword = function(reqBodyPassword){
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password)
};


module.exports = mongoose.model('users', schema);
