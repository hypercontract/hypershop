const { isNull } = require('lodash');
const rootUris = require('../root/uris');

module.exports = {
    getBasePath,
    getBaseUri,
    getRootPath,
    getRootUri,
    getShoppingCartItemsPath,
    getShoppingCartItemsUri,
    getShoppingCartItemPath,
    getShoppingCartItemUri
};

function getBasePath() {
    return '/shoppingCart';
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

function getShoppingCartItemsPath() {
    return getRootPath() + 'items/';
}

function getShoppingCartItemsUri() {
    return getBaseUri() + getShoppingCartItemsPath();
}

function getShoppingCartItemPath(id = null) {
    const pathTemplate = getShoppingCartItemsPath() + ':shoppingCartItemId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':shoppingCartItemId', id);
    }

    return pathTemplate;
}

function getShoppingCartItemUri(id) {
    return getBaseUri() + getShoppingCartItemPath(id);
}
