const { Resource } = require('hal');
const { map, omit } = require('lodash');
const { getRootUri, getShoppingCartItemUri } = require('./uris');
const orderUris = require('../orders/uris');
const productUris = require('../products/uris');
const { shop } = require('../shared/namespaces');

module.exports = {
    fromShoppingCart,
    fromShoppingCartItem
};

function fromShoppingCart(shoppingCart) {
    const resource = Resource(
        omit(shoppingCart, ['items']),
        getRootUri()
    )
        .embed(
            shop('shoppingCartItems'),
            map(shoppingCart.items, fromShoppingCartItem)
        );

    if (shoppingCart.items.length > 0) {
        resource.link(shop('placeOrder'), orderUris.getRootUri());
    }

    return resource;
}

function fromShoppingCartItem(shoppingCartItem) {
    return Resource(
        omit(shoppingCartItem, ['_id', 'product']),
        getShoppingCartItemUri(shoppingCartItem._id)
    )
        .link(shop('product'), productUris.getProductUri(shoppingCartItem.product))
        .link(shop('updateQuantity'), getShoppingCartItemUri(shoppingCartItem._id))
        .link(shop('remove'), getShoppingCartItemUri(shoppingCartItem._id));
}