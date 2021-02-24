const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

console.log(`current files: ${getDirectories(__dirname)}`)
let Service = require('services/TestService');

exports.TestService = Service.TestService;
module.exports.TestService = Service.TestService;
module.exports.TestService.configRoutes = Service.TestService.configRoutes;
