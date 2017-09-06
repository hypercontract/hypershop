const { Resource } = require('hal');
const { map, omit } = require('lodash');
const { getRootUri, getProductUri } = require('./uris');
const shoppingCartUris = require('../shoppingCart/uris');
const { shop } = require('../shared/namespaces');

module.exports = {
    fromProducts,
    fromProduct
};

function fromProducts(products) {
    return Resource(
        {},
        getRootUri()
    )
        .embed(
            shop('products'),
            map(products, fromProduct)   
        );
}

function fromProduct(product) {
    return Resource(
        omit(product, ['_id', 'image']),
        getProductUri(product._id)
    )
        .link(shop('addToShoppingCart'), shoppingCartUris.getShoppingCartItemsUri())
        .link(shop('image'), product.image);
}