const { Resource } = require('hal');
const { map, omit } = require('lodash');
const { getRootUri, getOrderUri } = require('./uris');
const {shop } = require('../shared/namespaces');

module.exports = {
    fromOrders,
    fromOrder
};

function fromOrders(orders) {
    return Resource(
        {},
        getRootUri()
    )
        .embed(
            shop('orders'),
            map(orders, fromOrder)
        );
}

function fromOrder(order) {
    const resource = Resource(
        omit(order, ['_id']),
        getOrderUri(order._id)
    );

    if (['PaymentDue', 'Processing'].includes(order.status)) {
        resource.link(shop('cancel'), getOrderUri(order._id));
    }
    
    return resource;
}