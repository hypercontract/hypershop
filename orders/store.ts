import { createOrGetStore } from '../store/storeFactory';
import { Order } from './model';

export function getOrderStore() {
    return createOrGetStore<Order>('order');
}
