import * as shoppingCartUris from '../shoppingCart/uris';
import { Product } from './model';
import { getProductUri } from './uris';

const activeNavItem = 'products';

export function fromProducts(products: Product[]) {
    return [
        'products/products',
        {
            activeNavItem,
            products,
            links: {
                product: products.map(product => getProductUri(product._id!)),
                addToShoppingCart: products.map(() => shoppingCartUris.getShoppingCartItemsUri())
            }
        }
    ];
}

export function fromProduct(product: Product) {
    return [
        'products/product',
        {
            activeNavItem,
            product,
            links: {
                addToShoppingCart: shoppingCartUris.getShoppingCartItemsUri()
            }
        }
    ];
}
