const config = require('config');

module.exports = {
    getBaseUri,
    getRootPath,
    getRootUri
};

function getBaseUri() {
    const scheme = config.get('http.scheme');
    const hostname = config.get('http.hostname');
    const port = config.get('http.port');
    return `${scheme}://${hostname}:${port}`;
}

function getRootPath() {
    return '/';
}

function getRootUri() {
    return getBaseUri() + getRootPath();
}
