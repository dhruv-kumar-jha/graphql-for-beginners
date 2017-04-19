'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
} = GraphQL;

// lets import our user type
const UserType = require('../types/User');

// lets import our user resolver
const UserResolver = require('../resolvers/User');


module.exports = {

	create() {
		return {
			type: UserType,
			description: 'Add new User',

			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users full name, Cannot be left empty',
				},
				email: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users email address, Must be valid and unique',
				},
				password: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users password, will be automatically hashed',
				},
				phone: {
					type: GraphQLString,
					description: 'Enter users phone number',
				},
				status: {
					type: GraphQLInt,
					description: 'Enters users status, by default its set to active. 1: active, 2: disabled',
				},
			},
			resolve(parent, fields) {
				return UserResolver.create(fields);
			}
		}
	},


	update() {
		return {
			type: UserType,
			description: 'Update user details',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user id',
				},
				name: {
					type: GraphQLString,
					description: 'Enter users full name, Cannot be left empty',
				},
				email: {
					type: GraphQLString,
					description: 'Enter users email address, Must be valid and unique',
				},
				password: {
					type: GraphQLString,
					description: 'Enter users password, will be automatically hashed',
				},
				phone: {
					type: GraphQLString,
					description: 'Enter users phone number',
				},
				status: {
					type: GraphQLInt,
					description: 'Enters users status. 1: active, 2: disabled',
				},
			},
			resolve(parent, fields) {
				return UserResolver.update(fields);
			}

		}
	},


	delete() {
		return {
			type: UserType,
			description: 'Delete existing USer',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user id',
				},
			},
			resolve(parent, fields) {
				return UserResolver.delete(fields);
			}
		}
	},


};
