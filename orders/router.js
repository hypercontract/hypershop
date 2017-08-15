const express = require('express');
const moment = require('moment');

const ordersStore = require('./orders');

const basePath = '/orders';

const router = express.Router();

router.get('/', (request, response) => {
    ordersStore.find()
        .then(orders => {
            response
                .status(200)
                .json(orders);
        });
});

router.post('/', (request, response) => {
    ordersStore.insert(Object.assign(
        {
            date: moment().format(),
            status: 'PaymentDue'
        },
        request.body
    ))
        .then(orderId => {
            response.redirect(201, `${basePath}/${orderId}`);
        });
});

router.get('/:orderId', (request, response) => {
    ordersStore.findOne(request.params.orderId)
        .then(order => {
            response
                .status(200)
                .json(order);
        });
});

router.delete('/:orderId', (request, response) => {
    ordersStore.remove(request.params.orderId)
        .then(() => {
            response.redirect(204, basePath);
        });
});

module.exports = {
    basePath,
    router
};
