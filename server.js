'use strict';

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const config = require('./app/global/config');
const mongoose = require('mongoose');

const expressGraphQL = require('express-graphql');

// let's import the schema file we just created
const GraphQLSchema = require('./app/graphql');

mongoose.Promise = require('bluebird');
mongoose.connect( config.database.HOST );

const app = express();

app.set( 'port', config.server.PORT );
app.disable('x-powered-by');

app.use( cors({ optionsSuccessStatus: 200 }) );
app.use( body_parser.json({ limit: '50mb' }) );
app.use( body_parser.urlencoded({ limit: '50mb', extended: true }) );


// here we specify where we want our GraphQL server to be accessible at, For now /graphql seems fine.
// graphiql is the GUI we can use play around with our GraphQL server, Lets enable this for now, Disable this in the production.
app.use(
	'/graphql',
	expressGraphQL( () => {
		return {
			graphiql: true,
			schema: GraphQLSchema,
		}
	})
);

// our default route.
app.get( '/', (req, res) => {
	res.json({
		code: 200,
		message: 'Hello World'
	});
});

// start the server
app.listen(
	app.get('port'),
	() => {
		const port = app.get('port');
		console.log('GraphQL Server Running at http://127.0.0.1:' + port );
	}
);

