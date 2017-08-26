const rootUris = require('../root/uris');

module.exports = {
    getBasePath,
    getBaseUri,
    getRootPath,
    getRootUri
};

function getBasePath() {
    return '/userProfile';
}

function getBaseUri() {
    return rootUris.getBaseUri() + getBasePath();
}

function getRootPath() {
    return '/';
}

function getRootUri() {
    return getBasePath() + getRootPath();
}
