const { getShoppingCartItemUri } = require('./uris');
const orderUris = require('../orders/uris');
const productUris = require('../products/uris');

module.exports = {
    fromShoppingCart
};

function fromShoppingCart(shoppingCart, userProfile) {
    const links = {
        product: shoppingCart.items.map(
            shoppingCartItem => productUris.getProductUri(shoppingCartItem.product)
        ),
        remove: shoppingCart.items.map(
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id)
        ),
        updateQuantity: shoppingCart.items.map(
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id)
        )
    };

    if (shoppingCart.items.length > 0) {
        links.placeOrder = orderUris.getRootUri();
    }
    
    return [
        'shoppingCart/shoppingCart',
        {
            shoppingCart,
            userProfile,
            links
        }
    ];
}
