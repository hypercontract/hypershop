const express = require('express');
const config = require('config');
const hal = require('./hal');
const shoppingCartService = require('./service');
const { getBasePath, getRootPath, getRootUri, getShoppingCartItemsPath, getShoppingCartItemPath } = require('./uris');
const { getProductUri } = require('../products/uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    shoppingCartService.getShoppingCart()
        .then(shoppingCart => sendResponse(response, {
            'json': shoppingCart,
            [config.app.mediaType]: hal.fromShoppingCart(shoppingCart)
        }));
});

router.post(getShoppingCartItemsPath(), (request, response) => {
    let product;

    // TODO: extract into separate method
    if (request.get('Content-Type') === config.app.mediaType) {
        product = request.body.product.replace(new RegExp(getProductUri('(.*)')), '$1');
    } else {
        product = request.body.product;
    }

    shoppingCartService.addShoppingCartItem(
        product,
        request.body.quantity
    )
        .then(() => response.redirect(201, getRootUri()));
});

router.patch(getShoppingCartItemPath(), (request, response) => {
    shoppingCartService.updateShoppingCartItemQuantity(
        request.params.shoppingCartItemId,
        request.body.quantity
    )
        .then(() => response.redirect(204, getRootUri()));
});

router.delete(getShoppingCartItemPath(), (request, response) => {
    shoppingCartService.deleteShoppingCartItem(
        request.params.shoppingCartItemId
    )
        .then(() => response.redirect(204, getRootUri()));
});

module.exports = {
    basePath: getBasePath(),
    router
};
