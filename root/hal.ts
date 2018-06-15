import { Resource } from 'hal';
import * as orderUris from '../orders/uris';
import * as productUris from '../products/uris';
import { shop } from '../profile/namespaces';
import * as shoppingCartUris from '../shoppingCart/uris';
import * as userProfileUris from '../userProfile/uris';
import { ApiRoot } from './model';
import { getRootUri } from './uris';

export function fromApiRoot(apiRoot: ApiRoot) {
    return Resource(apiRoot, getRootUri())
        .link(shop('searchCatalog'), {
            href: productUris.getRootUriTemplate(),
            templated: true
        })
        .link(shop('shoppingCart'), shoppingCartUris.getRootUri())
        .link(shop('orders'), orderUris.getRootUri())
        .link(shop('userProfile'), userProfileUris.getRootUri());
}
