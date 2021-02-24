const { readdirSync } = require('fs')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .map(dirent => dirent.name)

console.log(`TEST_SERVICE (FAKE): files from ${__dirname}/services": ${getDirectories(__dirname + "/services")}`)
let Service = require('../gen/srv/srv/services/TestService');
exports.TestService = Service.TestService;
module.exports.TestService = Service.TestService;
module.exports.TestService.configRoutes = Service.TestService.configRoutes;

