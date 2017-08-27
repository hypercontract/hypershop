const { Resource } = require('hal');
const { map } = require('lodash');
const { getRootUri, getShoppingCartItemUri } = require('./uris');
const { cfha } = require('../shared/namespaces');

module.exports = {
    fromShoppingCart,
    fromShoppingCartItem
};

function fromShoppingCart(shoppingCart) {
    return Resource(
        Object.assign(
            {},
            shoppingCart,
            {
                items: map(shoppingCart.items, fromShoppingCartItem)
            }
        ),
        getRootUri()
    );
}

function fromShoppingCartItem(shoppingCartItem) {
    return Resource(shoppingCartItem, getShoppingCartItemUri(shoppingCartItem._id))
        .link(cfha('update-quantity'), getShoppingCartItemUri(shoppingCartItem._id))
        .link(cfha('remove'), getShoppingCartItemUri(shoppingCartItem._id));
}
