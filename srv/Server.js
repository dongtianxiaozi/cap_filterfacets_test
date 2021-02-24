const { readdirSync } = require('fs')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

console.log(`current files: ${getDirectories(__dirname)}`)
let cds = require("@sap/cds");
require('../gen/srv/srv/services/Server');
module.exports = cds.server;