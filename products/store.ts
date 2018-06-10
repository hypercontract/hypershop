import { createOrGetStore } from '../store/storeFactory';
import { Product } from './model';

export function getProductStore() {
    return createOrGetStore<Product>('product');
}
