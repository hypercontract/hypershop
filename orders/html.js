const { getOrderUri } = require('./uris');

module.exports = {
    fromOrders,
    fromOrder
};

function fromOrders(orders) {
    return [
        'orders/orders',
        {
            orders,
            links: {
                order: orders.map(order => getOrderUri(order._id)),
            }
        }
    ];
}

function fromOrder(order) {
    const links = {
        addToShoppingCart: getOrderUri(order._id)
    };

    if (['PaymentDue', 'Processing'].includes(order.status)) {
        links.cancel = getOrderUri(order._id);
    }

    return [
        'orders/order',
        {
            order,
            links
        }
    ];
}
