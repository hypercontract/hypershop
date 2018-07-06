import { map, omit } from 'lodash';
import * as orderUris from '../orders/uris';
import * as productUris from '../products/uris';
import { shop } from '../profile/namespaces';
import { ShoppingCart, ShoppingCartItem } from './model';
import { getRootUri, getShoppingCartItemUri } from './uris';

export function fromShoppingCart(shoppingCart: ShoppingCart) {
    const resource = {
        '@context': {
            items: {
                '@id': shop('items'),
                '@container': '@set'
            }
        },
        '@id': getRootUri(),
        '@type': shop('ShoppingCart'),
        ...shop(omit(shoppingCart, ['items'])),
        [shop('items')]: map(shoppingCart.items, fromShoppingCartItem)
    };

    if (shoppingCart.items.length > 0) {
        resource[shop('placeOrder')] = orderUris.getRootUri();
    }

    return resource;
}

export function fromShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return {
        '@id': getShoppingCartItemUri(shoppingCartItem._id!),
        '@type': shop('LineItem'),
        ...shop(omit(shoppingCartItem, ['_id', 'product'])),
        [shop('product')]: productUris.getProductUri(shoppingCartItem.product),
        [shop('updateQuantity')]: getShoppingCartItemUri(shoppingCartItem._id!),
        [shop('remove')]: getShoppingCartItemUri(shoppingCartItem._id!)
    };
}


