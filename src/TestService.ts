const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .map(dirent => dirent.name)

console.log(`TEST_SERVICE (REAL): files from ${__dirname}/services": ${getDirectories(__dirname + "/services")}`)
let Service = require('./services/testservice');

exports.TestService = Service.TestService;
module.exports.TestService = Service.TestService;
module.exports.TestService.configRoutes = Service.TestService.configRoutes;
