import moment from 'moment';
import { Order } from './model';
import { getOrderUri } from './uris';

const activeNavItem = 'orders';

export function fromOrders(orders: Order[]) {
    return [
        'orders/orders',
        {
            activeNavItem,
            orders,
            links: {
                order: orders.map(order => getOrderUri(order._id!))
            },
            formatDate
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
            activeNavItem,
            order,
            links,
            formatDate
        }
    ];
}

function formatDate(date: string) {
    return moment(date).format('DD.MM.YYYY HH:mm:ss');
}
