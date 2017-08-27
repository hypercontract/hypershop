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
    const resource = Resource(order, getOrderUri(order._id));

    if (['PaymentDue', 'Processing'].includes(order.status)) {
        resource.link(cfha('cancel'), getOrderUri(order._id));
    }
    
    return resource;
}