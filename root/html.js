const productUris = require('../products/uris');
const shoppingCartUris = require('../shoppingCart/uris');
const orderUris = require('../orders/uris');
const userProfileUris = require('../userProfile/uris');

module.exports = {
    fromApiRoot
};

function fromApiRoot() {
    return [
        'root/index',
        {
            links: {
                searchCatalog: productUris.getRootUri(),
                shoppingCart: shoppingCartUris.getRootUri(),
                orders: orderUris.getRootUri(),
                userProfile: userProfileUris.getRootUri()
            }
        }
    ];
}
