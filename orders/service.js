const moment = require('moment');
const { map, omit } = require('lodash');
const orderStore = require('./store');
const shoppingCartService = require('../shoppingCart/service');

module.exports = {
    createOrder,
    getOrder,
    getOrders,
    updateOrderStatus
};

function createOrder(values) {
    return orderStore.insert(
        getNewOrder(values)
    )
        .then(orderId => shoppingCartService.emptyShoppingCart()
            .then(() => orderId));
}

function getOrder(id) {
    return orderStore.findOne(id);
}

function getOrders() {
    return orderStore.find()
        .then(orders => sortOrdersByDate(orders));
}

function updateOrderStatus(id, status) {
    return orderStore.update(
        id,
        { status: status }
    );
}


function getNewOrder(values) {
    return Object.assign(
        {
            date: moment().format(),
            status: 'PaymentDue',
            items: values.items.map(item => omit(item, ['_id'])),
            billingAddress: omit(values.billingAddress, ['_id']),
            shippingAddress: omit(values.shippingAddress, ['_id']),
            payment: omit(values.payment, ['_id'])
        }
    );
}

function sortOrdersByDate(orders) {
    return orders
        .concat()
        .sort((date1, date2) => new Date(date2.date) - new Date(date1.date));
}