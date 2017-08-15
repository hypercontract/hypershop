const express = require('express');

const shoppingCartItemsStore = require('./shoppingCartItems');
const productStore = require('../catalog/products');

const basePath = '/shoppingCart';

const router = express.Router();

router.get('/', (request, response) => {
    shoppingCartItemsStore.find()
        .then(shoppingCartItems => {
            response
                .status(200)
                .json({
                    items: shoppingCartItems,
                    totalPrice: shoppingCartItems.reduce(
                        (sum, item) => (sum + (item.price * item.quantity)),
                        0
                    )
                });
        });
});

router.post('/items', (request, response) => {
    productStore.findOne(request.body.product)
        .then(product => {
            shoppingCartItemsStore.insert({
                name: product.name,
                price: product.price,
                quantity: request.body.quantity,
                product: request.body.product
            })
                .then(() => {
                    response.redirect(201, `${basePath}`);
                });
        });
});

router.patch('/items/:shoppingCartItemId', (request, response) => {
    shoppingCartItemsStore.update(
        request.params.shoppingCartItemId,
        request.body
    )
        .then(() => {
            response.redirect(204, '/shoppingCart');
        });
});

router.delete('/items/:shoppingCartItemId', (request, response) => {
    shoppingCartItemsStore.remove(
        request.params.shoppingCartItemId
    )
        .then(() => {
            response.redirect(204, '/shoppingCart');
        });
});

module.exports = {
    basePath,
    router
};
