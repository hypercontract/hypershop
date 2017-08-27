const { Resource } = require('hal');
const { map } = require('lodash');
const { getRootUri, getProductUri } = require('./uris');
const shoppingCartUris = require('../shoppingCart/uris');
const { cfha } = require('../shared/namespaces');

module.exports = {
    fromProducts,
    fromProduct
};

function fromProducts(products) {
    return Resource(
        {
            items: map(products, fromProduct)
        },
        getRootUri()
    );
}

function fromProduct(product) {
    return Resource(product, getProductUri(product._id))
        .link(cfha('add-to-shopping-cart'), shoppingCartUris.getRootUri());
}
