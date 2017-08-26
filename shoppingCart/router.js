const express = require('express');

const shoppingCartService = require('./service');

const basePath = '/shoppingCart';

const router = express.Router();

router.get('/', (request, response) => {
    shoppingCartService.getShoppingCart()
        .then(shoppingCart => response.json(shoppingCart));
});

router.post('/items', (request, response) => {
    shoppingCartService.addShoppingCartItem(
        request.body.product,
        request.body.quantity
    )
        .then(() => response.redirect(201, `${basePath}`));
});

router.patch('/items/:shoppingCartItemId', (request, response) => {
    shoppingCartService.updateShoppingCartItemQuantity(
        request.params.shoppingCartItemId,
        request.body.quantity
    )
        .then(() => response.redirect(204, '/shoppingCart'));
});

router.delete('/items/:shoppingCartItemId', (request, response) => {
    shoppingCartService.deleteShoppingCartItem(
        request.params.shoppingCartItemId
    )
        .then(() => response.redirect(204, '/shoppingCart'));
});

module.exports = {
    basePath,
    router
};
