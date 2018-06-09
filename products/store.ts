import { createOrGetStore } from '../shared/storeFactory';
import { Product } from './model';

export function getProductStore() {
    return createOrGetStore<Product>('product');
}
