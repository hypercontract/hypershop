const moment = require('moment');
const { omit } = require('lodash');
const orderStore = require('./store');
const shoppingCartService = require('../shoppingCart/service');
const userProfileService = require('../userProfile/service');

module.exports = {
    createOrder,
    getOrder,
    getOrders,
    updateOrderStatus
};

function createOrder(values) {
    return Promise.all([
        Promise.all(values.items.map(
            lineItemId => shoppingCartService.getShoppingCartItem(lineItemId)
        )),
        userProfileService.getAddress(values.billingAddress),
        userProfileService.getAddress(values.shippingAddress),
        userProfileService.getPaymentOption(values.payment)
    ])
        .then(([lineItems, billingAddress, shippingAddress, payment]) => {
            return orderStore.insert(
                getNewOrder(lineItems, billingAddress, shippingAddress, payment)
            )
                .then(orderId => shoppingCartService.emptyShoppingCart()
                    .then(() => orderId));
        });
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



function getNewOrder(lineItems, billingAddress, shippingAddress, payment) {
    return Object.assign(
        {
            date: moment().format(),
            status: 'PaymentDue',
            items: lineItems.map(item => omit(item, ['_id'])),
            billingAddress: omit(billingAddress, ['_id']),
            shippingAddress: omit(shippingAddress, ['_id']),
            payment: omit(payment, ['_id'])
        }
    );
}

function sortOrdersByDate(orders) {
    return orders
        .concat()
        .sort((date1, date2) => new Date(date2.date) - new Date(date1.date));
}