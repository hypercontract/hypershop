import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { getRootUri, getProductUri } from './uris';
import * as shoppingCartUris from '../shoppingCart/uris';
import { shop } from '../shared/namespaces';
import { Product } from './model';

export function fromProducts(products: Product[]) {
    return Resource(
        {},
        getRootUri()
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