const { getProductUri } = require('./uris');
const shoppingCartUris = require('../shoppingCart/uris');

module.exports = {
    fromProducts,
    fromProduct
};

function fromProducts(products) {
    return [
        'products/products',
        {
            products,
            links: {
                product: products.map(product => getProductUri(product._id)),
                addToShoppingCart: products.map(() => shoppingCartUris.getShoppingCartItemsUri())
            }
        }
    ];
}

function fromProduct(product) {
    return [
        'products/product',
        {
            product,
            links: {
                addToShoppingCart: shoppingCartUris.getShoppingCartItemsUri()
            }
        }
    ];
}
