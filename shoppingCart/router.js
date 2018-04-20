const express = require('express');
const config = require('config');
const { escapeRegExp } = require('lodash');
const hal = require('./hal');
const html = require('./html');
const shoppingCartService = require('./service');
const userProfileService = require('../userProfile/service');
const { getBasePath, getRootPath, getRootUri, getShoppingCartItemsPath, getShoppingCartItemPath } = require('./uris');
const { getProductUri } = require('../products/uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    Promise.all([
        shoppingCartService.getShoppingCart(),
        userProfileService.getUserProfile()
    ])
        .then(([shoppingCart, userProfile]) => sendResponse(response, {
            'json': shoppingCart,
            'html': html.fromShoppingCart(shoppingCart, userProfile),
            [config.app.mediaType.hal]: hal.fromShoppingCart(shoppingCart)
        }));
});

router.post(getShoppingCartItemsPath(), (request, response) => {
    let productId;
    // TODO: use mime type matcher
    if (request.get('Content-Type') === config.app.mediaType.hal) {
        productId = request.body.product.replace(new RegExp(getProductUri('(.*)')), '$1');
    } else {
        productId = request.body.product;
    }
    
    let statusCode = 201;
    // TODO: use mime type matcher
    if (request.get('Accept').match(escapeRegExp('text/html'))) {
        statusCode = 303;
    }

    shoppingCartService.addShoppingCartItem(
        productId,
        request.body.quantity
    )
        .then(() => response.redirect(statusCode, getRootUri()));
});

router.patch(getShoppingCartItemPath(), (request, response) => {
    shoppingCartService.updateShoppingCartItemQuantity(
        request.params.shoppingCartItemId,
        request.body.quantity
    )
        .then(() => response.redirect(303, getRootUri()));
});

router.delete(getShoppingCartItemPath(), (request, response) => {
    shoppingCartService.deleteShoppingCartItem(
        request.params.shoppingCartItemId
    )
        .then(() => response.redirect(303, getRootUri()));
});

module.exports = {
    basePath: getBasePath(),
    router
};
