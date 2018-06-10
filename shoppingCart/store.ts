import { createOrGetStore } from '../store/storeFactory';
import { ShoppingCartItem } from './model';

export function getShoppingCartItemStore() {
    return createOrGetStore<ShoppingCartItem>('shoppingCartItem');
}
