import { createOrGetStore } from '../shared/storeFactory';
import { Order } from './model';

export function getOrderStore() {
    return createOrGetStore<Order>('order');
}
