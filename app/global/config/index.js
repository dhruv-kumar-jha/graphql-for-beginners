'use strict';

module.exports = {

	server: {
		PORT: process.env.PORT || 1221,
	},

	database: {
		HOST: process.env.MONGODB || 'mongodb://admin:MySuperS3cretPassw0rd@ds163940.mlab.com:63940/graphql',
	},

};
