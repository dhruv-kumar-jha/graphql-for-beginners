'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const bcrypt = require('bcrypt-nodejs');

const hash_password = ( password ) => {
	let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
	let hash = bcrypt.hashSync( password, salt );
	return hash;
};

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
		},
		password: {
			type: String
		},
		phone: {
			type: String
		},
		status: {
			type: Number,
			default: 1
		},
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'users',
	}
);


UserSchema.methods.comparePassword = function(password) {
	if ( ! this.password ) {
		return false;
	}
	return bcrypt.compareSync( password, this.password );
};


UserSchema.pre('save', function(next) {
	// check if password is present and is modified.
	if ( this.password && this.isModified('password') ) {
		this.password = hash_password(this.password);
	}
	// do stuff
	next();
});


module.exports = mongoose.model( 'User', UserSchema );
