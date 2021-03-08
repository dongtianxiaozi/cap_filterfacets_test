const cds = require('@sap/cds');

// entities
const { retrieveJwt } = require('@sap-cloud-sdk/core');

module.exports = cds.service.impl((srv) => {
	srv.on('READ', 'checkUser', (req) => {
		// try to query the users
		return [
			{
				username: req.user.id,
				is_user: req.user.is('user'),
				token: retrieveJwt(req._.req),
				environment: process.env.NODE_ENV,
			},
		];
	});
});
