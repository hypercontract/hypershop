const { Resource } = require('hal');
const { map } = require('lodash');
const { getRootUri, getOrderUri } = require('./uris');
const { cfha } = require('../shared/namespaces');

module.exports = {
    fromOrders,
    fromOrder
};

function fromOrders(orders) {
    return Resource(
        {
            items: map(orders, fromOrder)
        },
        getRootUri()
    );
}

function fromOrder(order) {
    return Resource(order, getOrderUri(order._id))
        .link(cfha('cancel'), getOrderUri(order._id));
}
