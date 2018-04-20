import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { getRootUri, getOrderUri } from './uris';
import { shop } from '../shared/namespaces';
import { Order, OrderStatus } from './model';

export function fromOrders(orders: Order[]) {
    return Resource(
        {},
        getRootUri()
    )
        .embed(
            shop('orders'),
            map(orders, fromOrder)
        );
}

export function fromOrder(order: Order) {
    const resource = Resource(
        omit(order, ['_id']),
        getOrderUri(order._id!)
    );

    if ([OrderStatus.PaymentDue, OrderStatus.Processing].includes(order.status)) {
        resource.link(shop('cancel'), getOrderUri(order._id!));
    }
    
    return resource;
}