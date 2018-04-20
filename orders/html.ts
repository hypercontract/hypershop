import { getOrderUri } from './uris';
import { Order } from './model';

export function fromOrders(orders: Order[]) {
    return [
        'orders/orders',
        {
            orders,
            links: {
                order: orders.map(order => getOrderUri(order._id!)),
            }
        }
    ];
}

export function fromOrder(order: Order) {
    const links: { [key: string]: string } = {
        addToShoppingCart: getOrderUri(order._id!)
    };

    if (['PaymentDue', 'Processing'].includes(order.status)) {
        links.cancel = getOrderUri(order._id!);
    }

    return [
        'orders/order',
        {
            order,
            links
        }
    ];
}
