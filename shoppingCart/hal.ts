import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { getRootUri, getShoppingCartItemUri } from './uris';
import * as orderUris from '../orders/uris';
import * as productUris from '../products/uris';
import { shop } from '../shared/namespaces';
import { ShoppingCart, ShoppingCartItem } from './model';

export function fromShoppingCart(shoppingCart: ShoppingCart) {
    const resource = Resource(
        omit(shoppingCart, ['items']),
        getRootUri()
    )
        .embed(
            shop('shoppingCartItems'),
            map(shoppingCart.items, fromShoppingCartItem)
        );

    if (shoppingCart.items.length > 0) {
        resource.link(shop('placeOrder'), orderUris.getRootUri());
    }

    return resource;
}

export function fromShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    return Resource(
        omit(shoppingCartItem, ['_id', 'product']),
        getShoppingCartItemUri(shoppingCartItem._id!)
    )
        .link(shop('product'), productUris.getProductUri(shoppingCartItem.product))
        .link(shop('updateQuantity'), getShoppingCartItemUri(shoppingCartItem._id!))
        .link(shop('remove'), getShoppingCartItemUri(shoppingCartItem._id!));
}
