import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { Order, OrderStatus } from './model';
import { getOrderUri, getRootUri } from './uris';

export function fromOrders(orders: Order[]) {
    return {
        '@id': getRootUri(),
        '@type': shop('Orders'),
        '@context': {
            orders: {
                '@id': shop('orders'),
                '@container': '@set'
            },
            items: {
                '@id': shop('items'),
                '@container': '@set'
            }
        },
        [shop('orders')]: map(orders, fromOrder)
    };
}

export function fromOrder(order: Order) {
    const resource = {
        '@id': getOrderUri(order._id!),
        '@type': shop('Order'),
        '@context': {
            items: {
                '@id': shop('items'),
                '@container': '@set'
            }
        },
        ...shop(omit(order, ['_id']))
    };

    if ([OrderStatus.PaymentDue, OrderStatus.Processing].includes(order.status)) {
        resource[shop('cancel')] = getOrderUri(order._id!);
    }

    return resource;
}
