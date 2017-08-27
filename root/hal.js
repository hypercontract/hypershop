const { Resource } = require('hal');
const { getRootUri } = require('./uris');
const { cfha } = require('../shared/namespaces');
const productUris = require('../products/uris');
const shoppingCartUris = require('../shoppingCart/uris');
const orderUris = require('../orders/uris');
const userProfileUris = require('../userProfile/uris');

module.exports = {
    fromApiRoot
};

function fromApiRoot(apiRoot) {
    return Resource(apiRoot, getRootUri())
        .link(cfha('search-catalog'), {
            href: productUris.getRootUriTemplate(),
            templated: true
        })
        .link(cfha('shopping-cart'), shoppingCartUris.getRootUri())
        .link(cfha('orders'), orderUris.getRootUri())
        .link(cfha('user-profile'), userProfileUris.getRootUri());
}
