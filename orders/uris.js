const { isNull } = require('lodash');
const rootUris = require('../root/uris');

module.exports = {
    getBasePath,
    getBaseUri,
    getRootPath,
    getRootUri,
    getOrderPath,
    getOrderUri
};

function getBasePath() {
    return '/orders';
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

function getOrderPath(id = null) {
    const pathTemplate = getRootPath() + ':orderId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':orderId', id);
    }

    return pathTemplate;
}

function getOrderUri(id) {
    return getBaseUri() + getOrderPath(id);
}
