const config = require('config');

module.exports = {
    version: config.get('app.version')
};