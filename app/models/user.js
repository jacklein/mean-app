/**
 * Created by jackklein on 6/13/16.
 */
// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: {unique: true}},
    password: { type: String, required: true, select: false}
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
    var user = this;

    // hash the pword only if it's been changed or user is new
    if(!user.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        // change pword to the hashed version
        user.password = hash;
        next();
    });
});

// method to compare a given password with the DB hash
UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);
