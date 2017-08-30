const { isNull } = require('lodash');
const rootUris = require('../root/uris');

module.exports = {
    getBasePath,
    getBaseUri,
    getRootPath,
    getRootUri,
    getAddressPath,
    getAddressUri,
    getPaymentOptionPath,
    getPaymentOptionUri
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
    return getBaseUri() + getRootPath();
}

function getAddressPath(id = null) {
    const pathTemplate = getRootPath() + 'addresses/:addressId/';
    
    if (!isNull(id)) {
        return pathTemplate.replace(':addressId', id);
    }

    return pathTemplate;
}

function getAddressUri(id = null) {
    return getBaseUri() + getAddressPath(id);
}

function getPaymentOptionPath(id) {
    const pathTemplate = getRootPath() + 'paymentOptions/:paymentOptionId/';
    
    if (!isNull(id)) {
        return pathTemplate.replace(':paymentOptionId', id);
    }

    return pathTemplate;
}

function getPaymentOptionUri(id) {
    return getBaseUri() + getPaymentOptionPath(id);
}
