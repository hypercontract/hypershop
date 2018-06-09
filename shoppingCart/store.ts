import { createOrGetStore } from '../shared/storeFactory';
import { ShoppingCartItem } from './model';

export function getShoppingCartItemStore() {
    return createOrGetStore<ShoppingCartItem>('shoppingCartItem');
}
