import cds from '@sap/cds';
console.log("INIT");
require('./services/Server');
console.log("SERVER INIT");
// @ts-ignore
module.exports = cds.server;