const express = require('express');

const orderService = require('./service');

const basePath = '/orders';

const router = express.Router();

router.get('/', (request, response) => {
    orderService.getOrders()
        .then(orders => response.json(orders));
});

router.post('/', (request, response) => {
    orderService.createOrder(request.body)
        .then(orderId => response.redirect(201, `${basePath}/${orderId}`));
});

router.get('/:orderId', (request, response) => {
    orderService.getOrder(request.params.orderId)
        .then(order => response.json(order));
});

router.patch('/:orderId', (request, response) => {
    orderService.updateOrder(
        request.params.orderId,
        request.body
    )
        .then(() => response.redirect(204, `${basePath}/${request.params.orderId}`));
});

module.exports = {
    basePath,
    router
};
