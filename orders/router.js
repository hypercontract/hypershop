const express = require('express');
const config = require('config');
const { escapeRegExp } = require('lodash');
const hal = require('./hal');
const html = require('./html');
const orderService = require('./service');
const { getBasePath, getRootPath, getOrderPath, getOrderUri } = require('./uris');
const shoppingCartUris = require('../shoppingCart/uris');
const userProfileUris = require('../userProfile/uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    orderService.getOrders()
        .then(orders => sendResponse(response, {
            'json': orders,
            'html': html.fromOrders(orders),
            [config.app.mediaType.hal]: hal.fromOrders(orders)
        }));
});

router.post(getRootPath(), (request, response) => {
    let statusCode = 201;
    // TODO: use mime type matcher
    if (request.get('Accept').match(escapeRegExp('text/html'))) {
        statusCode = 303;
    }

    let items;
    let billingAddress;
    let shippingAddress;
    let payment;

    // // TODO: use mime type matcher
    if (request.get('Content-Type') === config.app.mediaType.hal) {
        items = request.body.items.map(
            item => item.replace(new RegExp(shoppingCartUris.getShoppingCartItemUri('(.*)')), '$1')
        );
        billingAddress = request.body.billingAddress.replace(new RegExp(userProfileUris.getAddressUri('(.*)')), '$1');
        shippingAddress = request.body.shippingAddress.replace(new RegExp(userProfileUris.getAddressUri('(.*)')), '$1');
        payment = request.body.payment.replace(new RegExp(userProfileUris.getPaymentOptionUri('(.*)')), '$1');
    } else {
        items = request.body.items;
        billingAddress = request.body.billingAddress;
        shippingAddress = request.body.shippingAddress;
        payment = request.body.payment;
    }
    
    orderService.createOrder({
        items,
        billingAddress,
        shippingAddress,
        payment
    })
        .then(orderId => response.redirect(statusCode, getOrderUri(orderId)));
});

router.get(getOrderPath(), (request, response) => {
    orderService.getOrder(request.params.orderId)
        .then(order => sendResponse(response, {
            'json': order,
            'html': html.fromOrder(order),
            [config.app.mediaType.hal]: hal.fromOrder(order)
        }));
});

router.patch(getOrderPath(), (request, response) => {
    orderService.updateOrderStatus(
        request.params.orderId,
        request.body.status
    )
        .then(() => response.redirect(303, getOrderUri(request.params.orderId)));
});

router.delete(getOrderPath(), (request, response) => {
    orderService.updateOrderStatus(
        request.params.orderId,
        'Cancelled'
    )
        .then(() => response.redirect(303, getOrderUri(request.params.orderId)));
});

module.exports = {
    basePath: getBasePath(),
    router
};
