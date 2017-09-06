const { isNull } = require('lodash');
const rootUris = require('../root/uris');

module.exports = {
    getBasePath,
    getBaseUri,
    getRootPath,
    getRootUri,
    getResourcePath,
    getResourceUri
};

function getBasePath() {
    return '/profile';
}

function getBaseUri() {
    return rootUris.getBaseUri() + getBasePath();
}

function getRootPath() {
    return '/';
}

function getRootUri() {
    return getBaseUri() + getRootPath();
}

function getResourcePath(resourceName = null) {
    const pathTemplate = getRootPath() + ':resourceName/';
    
    if (!isNull(resourceName)) {
        return pathTemplate.replace(':resourceName', resourceName);
    }

    return pathTemplate;
}

function getResourceUri(resourceName) {
    return getBaseUri() + getResourcePath(resourceName);
}