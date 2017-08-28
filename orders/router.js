const express = require('express');
const config = require('config');
const hal = require('./hal');
const orderService = require('./service');
const { getBasePath, getRootPath, getOrderPath, getOrderUri } = require('./uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    orderService.getOrders()
        .then(orders => sendResponse(response, {
            'json': orders,
            [config.app.mediaType]: hal.fromOrders(orders)
        }));
});

router.post(getRootPath(), (request, response) => {
    orderService.createOrder(request.body)
        .then(orderId => response.redirect(201, getOrderUri(orderId)));
});

router.get(getOrderPath(), (request, response) => {
    orderService.getOrder(request.params.orderId)
        .then(order => sendResponse(response, {
            'json': order,
            [config.app.mediaType]: hal.fromOrder(order)
        }));
});

router.patch(getOrderPath(), (request, response) => {
    orderService.updateOrderStatus(
        request.params.orderId,
        request.body.status
    )
        .then(() => response.redirect(204, getOrderUri(request.params.orderId)));
});

router.delete(getOrderPath(), (request, response) => {
    orderService.updateOrderStatus(
        request.params.orderId,
        'Cancelled'
    )
        .then(() => response.redirect(204, getOrderUri(request.params.orderId)));
});

module.exports = {
    basePath: getBasePath(),
    router
};
