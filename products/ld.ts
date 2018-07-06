import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import * as shoppingCartUris from '../shoppingCart/uris';
import { Product } from './model';
import { getCatalogSearchUri, getProductUri } from './uris';

export function fromProducts(products: Product[], query?: string) {
    return {
        '@context': {
            products: {
                '@id': shop('products'),
                '@container': '@set'
            }
        },
        '@id': getCatalogSearchUri(query),
        '@type': shop('Products'),
        [shop('products')]: map(products, fromProduct)
    };
}

export function fromProduct(product: Product) {
    return {
        '@id': getProductUri(product._id!),
        '@type': shop('Product'),
        ...shop(omit(product, ['_id', 'image'])),
        [shop('addToShoppingCart')]: shoppingCartUris.getShoppingCartItemsUri(),
        [shop('image')]: product.image
    };
}
