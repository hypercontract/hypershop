import * as orderUris from '../orders/uris';
import * as productUris from '../products/uris';
import { UserProfile } from '../userProfile/model';
import { ShoppingCart } from './model';
import { getShoppingCartItemUri } from './uris';

const activeNavItem = 'shoppingCart';

export function fromShoppingCart(shoppingCart: ShoppingCart, userProfile: UserProfile) {
    const links: { [key: string]: string | string[] } = {
        product: shoppingCart.items.map(
            shoppingCartItem => productUris.getProductUri(shoppingCartItem.product)
        ),
        remove: shoppingCart.items.map(
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
        ),
        updateQuantity: shoppingCart.items.map(
            shoppingCartItem => getShoppingCartItemUri(shoppingCartItem._id!)
        )
    };

    if (shoppingCart.items.length > 0) {
        links.placeOrder = orderUris.getRootUri();
    }

    return [
        'shoppingCart/shoppingCart',
        {
            activeNavItem,
            shoppingCart,
            userProfile,
            links
        }
    ];
}
