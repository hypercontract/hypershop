import { ShoppingCartItem } from '../shoppingCart/model';
import { Entity, EntityId } from '../store/model';
import { Address, PaymentOption } from '../userProfile/model';

export interface Order extends Entity {
    status: OrderStatus;
    items: EntityId[] | OrderItem[];
    billingAddress: EntityId | Address;
    shippingAddress: EntityId | Address;
    payment: EntityId | PaymentOption;
    date: string;
}

export interface NewOrder {
    items: EntityId[];
    billingAddress: EntityId;
    shippingAddress: EntityId;
    payment: EntityId;
}

export interface OrderItem extends ShoppingCartItem {}

export enum OrderStatus {
    Cancelled = 'Cancelled',
    Delivered = 'Delivered',
    InTransit = 'InTransit',
    PaymentDue = 'PaymentDue',
    PickupAvailable = 'PickupAvailable',
    Problem = 'Problem',
    Processing = 'Processing',
    Returned = 'Returned'
}
