const moment = require('moment');
const orderStore = require('./store');
const shoppingCartService = require('../shoppingCart/service');

module.exports = {
    createOrder,
    getOrder,
    getOrders,
    updateOrder
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

function updateOrder(id, values) {
    return orderStore.update(
        id,
        values
    );
}


function getNewOrder(values) {
    return Object.assign(
        {
            date: moment().format(),
            status: 'PaymentDue'
        },
        values
    );
}

function sortOrdersByDate(orders) {
    return orders
        .concat()
        .sort((date1, date2) => new Date(date2.date) - new Date(date1.date));
}