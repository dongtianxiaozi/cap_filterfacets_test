let Service = require('./services/TestService');

exports.TestService = Service.TestService;
module.exports.TestService = Service.TestService;
module.exports.TestService.configRoutes = Service.TestService.configRoutes;
