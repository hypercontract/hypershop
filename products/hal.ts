import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import * as shoppingCartUris from '../shoppingCart/uris';
import { Product } from './model';
import { getCatalogSearchUri, getProductUri } from './uris';

export function fromProducts(products: Product[], query?: string) {
    return Resource(
        {},
        getCatalogSearchUri(query)
    )
        .embed(
            shop('products'),
            map(products, fromProduct)
        );
}

export function fromProduct(product: Product) {
    return Resource(
        omit(product, ['_id', 'image']),
        getProductUri(product._id!)
    )
        .link(shop('addToShoppingCart'), shoppingCartUris.getShoppingCartItemsUri())
        .link(shop('image'), product.image);
}
