const express = require('express');

const orderService = require('./service');
const { getBasePath, getRootPath, getOrderPath, getOrderUri } = require('./uris');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    orderService.getOrders()
        .then(orders => response.json(orders));
});

router.post(getRootPath(), (request, response) => {
    orderService.createOrder(request.body)
        .then(orderId => response.redirect(201, getOrderUri(orderId)));
});

router.get(getOrderPath(), (request, response) => {
    orderService.getOrder(request.params.orderId)
        .then(order => response.json(order));
});

router.patch(getOrderPath(), (request, response) => {
    orderService.updateOrder(
        request.params.orderId,
        request.body
    )
        .then(() => response.redirect(204, getOrderUri(request.params.orderId)));
});

module.exports = {
    basePath: getBasePath(),
    router
};
