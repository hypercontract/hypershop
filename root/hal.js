const { Resource } = require('hal');
const { getRootUri } = require('./uris');
const { shop } = require('../shared/namespaces');
const productUris = require('../products/uris');
const shoppingCartUris = require('../shoppingCart/uris');
const orderUris = require('../orders/uris');
const userProfileUris = require('../userProfile/uris');

module.exports = {
    fromApiRoot
};

function fromApiRoot(apiRoot) {
    return Resource(apiRoot, getRootUri())
        .link(shop('searchCatalog'), {
            href: productUris.getRootUriTemplate(),
            templated: true
        })
        .link(shop('shoppingCart'), shoppingCartUris.getRootUri())
        .link(shop('orders'), orderUris.getRootUri())
        .link(shop('userProfile'), userProfileUris.getRootUri());
}