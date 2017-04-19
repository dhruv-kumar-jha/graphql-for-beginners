'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema,
} = GraphQL;


// import the user query file we created
const UserQuery = require('./queries/User');

// import the user mutation file we created
const UserMutation = require('./mutations/User');


// lets define our root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
		users: UserQuery.index(),
		user: UserQuery.single(),
	},
});


// lets define our root mutation
const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
		addUser: UserMutation.create(),
		updateUser: UserMutation.update(),
		deleteUser: UserMutation.delete(),
	},
});



// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

