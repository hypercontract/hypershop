import * as moment from 'moment';
import { omit } from 'lodash';
import { orderStore } from './store';
import * as shoppingCartService from '../shoppingCart/service';
import * as userProfileService from '../userProfile/service';
import { EntityId } from '../shared/store';
import { Order, NewOrder, OrderStatus } from './model';
import { ShoppingCartItem } from '../shoppingCart/model';
import { Address, PaymentOption } from '../userProfile/model';

export function createOrder(values: NewOrder) {
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
}

export function getOrder(id: EntityId) {
    return orderStore.findOne(id);
}

export function getOrders() {
    return orderStore.find()
        .then(orders => sortOrdersByDate(orders));
}

export function updateOrderStatus(id: EntityId, status: OrderStatus) {
    return orderStore.update(
        id,
        { status }
    );
}

function getNewOrder(lineItems: ShoppingCartItem[], billingAddress: Address, shippingAddress: Address, payment: PaymentOption) {
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

function sortOrdersByDate(orders: Order[]) {
    return orders
        .concat()
        .sort((order1, order2) => new Date(order2.date).valueOf() - new Date(order1.date).valueOf());
}