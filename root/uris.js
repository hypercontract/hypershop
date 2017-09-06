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
    const uri = `${scheme}://${hostname}`;
    return omitPort(scheme, port) ? uri : `${uri}:${port}`;
}

function getRootPath() {
    return '/';
}

function getRootUri() {
    return getBaseUri() + getRootPath();
}

function omitPort(scheme, port) {
    return (scheme === 'http' && port === 80) ||
        (scheme === 'https' && port === 443);
}