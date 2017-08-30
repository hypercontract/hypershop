const { isNull } = require('lodash');
const shoppingCartItemStore = require('./store');
const productService = require('../products/service');

module.exports = {
    getShoppingCart,
    getShoppingCartItem,
    addShoppingCartItem,
    deleteShoppingCartItem,
    emptyShoppingCart,
    updateShoppingCartItemQuantity
};

function getShoppingCart() {
    return shoppingCartItemStore.find()
        .then(shoppingCartItems => {
            return {
                items: shoppingCartItems,
                totalPrice: getTotalPrice(shoppingCartItems)
            };
        });
}

function getShoppingCartItem(id) {
    return shoppingCartItemStore.findOne(id);
}

function addShoppingCartItem(productId, quantity) {
    return Promise.all([
        productService.getProduct(productId),
        getShoppingCartItemByProductId(productId)
    ])
        .then(([product, shoppingCartItem]) => {
            if (isNull(shoppingCartItem)) {
                return createShoppingCartItem(product, quantity);
            } else {
                return updateShoppingCartItemQuantity(
                    shoppingCartItem._id,
                    shoppingCartItem.quantity + quantity
                );
            }
        });
}

function deleteShoppingCartItem(id) {
    return shoppingCartItemStore.remove(id);
}

function emptyShoppingCart() {
    return shoppingCartItemStore.removeAll();
}

function updateShoppingCartItemQuantity(id, quantity) {
    return shoppingCartItemStore.update(
        id,
        { quantity: quantity }
    );
}



function createShoppingCartItem(product, quantity) {
    return shoppingCartItemStore.insert({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: quantity,
        product: product._id
    });
}

function getShoppingCartItemByProductId(productId) {
    return shoppingCartItemStore.find({
        product: productId
    })
        .then(shoppingCartItems => shoppingCartItems.length > 0 ? shoppingCartItems[0] : null);
}

function getTotalPrice(shoppingCartItems) {
    return shoppingCartItems.reduce(
        (sum, item) => (sum + (item.price * item.quantity)),
        0
    );
}
