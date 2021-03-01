const cds = require('@sap/cds')

// entities
const { Notifications, Users } = cds.entities('seidor.ip.s4notifications')

const { retrieveJwt } = require('@sap-cloud-sdk/core')

module.exports = cds.service.impl((srv) => {

    srv.on('READ', 'checkUser', (req) => {
        // try to query the users
        const users = [
            {
                username: req.user.id,
                is_user: req.user.is("user"),
                token: retrieveJwt(req._.req),
                environment: process.env.NODE_ENV
            }
        ]

        return users;
    })

});