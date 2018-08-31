import { omit } from 'lodash';
import { ShoppingCartItem } from '../shoppingCart/model';
import * as shoppingCartService from '../shoppingCart/service';
import { EntityId } from '../store/model';
import { Address, PaymentOption } from '../userProfile/model';
import * as userProfileService from '../userProfile/service';
import { NewOrder, Order, OrderStatus } from './model';
import { getOrderStore } from './store';

export function createOrder(values: NewOrder) {
    return getOrderStore()
        .then(orderStore => {
            return Promise.all([
                Promise.all(values.items.map(
                    (lineItemId: EntityId) => shoppingCartService.getShoppingCartItem(lineItemId)
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
        });

}

export function getOrder(id: EntityId) {
    return getOrderStore()
        .then(orderStore => orderStore.findOne(id));
}

export function getOrders() {
    return getOrderStore()
        .then(orderStore => orderStore.find())
        .then(orders => sortOrdersByDate(orders));
}

export function updateOrderStatus(id: EntityId, status: OrderStatus) {
    return getOrderStore()
        .then(orderStore => orderStore.update(
            id,
            { status }
        ));
}

function getNewOrder(lineItems: ShoppingCartItem[], billingAddress: Address, shippingAddress: Address, payment: PaymentOption) {
    return {
        date: (new Date()).toISOString(),
        status: 'PaymentDue',
        items: lineItems.map(item => omit(item, ['_id'])),
        billingAddress: omit(billingAddress, ['_id']),
        shippingAddress: omit(shippingAddress, ['_id']),
        payment: omit(payment, ['_id'])
    };
}

function sortOrdersByDate(orders: Order[]) {
    return orders
        .concat()
        .sort((order1, order2) => new Date(order2.date).valueOf() - new Date(order1.date).valueOf());
}
