const { Resource } = require('hal');
const { omit, map } = require('lodash');
const { getRootUri, getShoppingCartItemUri } = require('./uris');
const orderUris = require('../orders/uris');
const { cfha } = require('../shared/namespaces');

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
            cfha('shopping-cart-items'),
            map(shoppingCart.items, fromShoppingCartItem)
        );

    if (shoppingCart.items.length > 0) {
        resource.link(cfha('place-order'), orderUris.getRootUri());
    }

    return resource;
}

function fromShoppingCartItem(shoppingCartItem) {
    return Resource(shoppingCartItem, getShoppingCartItemUri(shoppingCartItem._id))
        .link(cfha('update-quantity'), getShoppingCartItemUri(shoppingCartItem._id))
        .link(cfha('remove'), getShoppingCartItemUri(shoppingCartItem._id));
}
