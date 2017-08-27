const { isNull } = require('lodash');
const rootUris = require('../root/uris');

module.exports = {
    getBasePath,
    getBaseUri,
    getRootPath,
    getRootUri,
    getRootUriTemplate,
    getProductPath,
    getProductUri
};

function getBasePath() {
    return '/products';
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

function getRootUriTemplate() {
    return getRootUri() + '{?query}';
}

function getProductPath(id) {
    const pathTemplate = getRootPath() + ':productId/';
    
    if (!isNull(id)) {
        return pathTemplate.replace(':productId', id);
    }

    return pathTemplate;
}

function getProductUri(id) {
    return getBaseUri() + getProductPath(id);
}
