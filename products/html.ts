import * as shoppingCartUris from '../shoppingCart/uris';
import { Product } from './model';
import { getProductUri } from './uris';

export function fromProducts(products: Product[]) {
    return [
        'products/products',
        {
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
            product,
            links: {
                addToShoppingCart: shoppingCartUris.getShoppingCartItemsUri()
            }
        }
    ];
}
