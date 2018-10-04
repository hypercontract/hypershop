import * as orderUris from '../orders/uris';
import * as productUris from '../products/uris';
import { shop } from '../profile/namespaces';
import * as shoppingCartUris from '../shoppingCart/uris';
import * as userProfileUris from '../userProfile/uris';
import { ApiRoot } from './model';

export function fromApiRoot(apiRoot: ApiRoot, apiRootProfile: any) {
    return {
        ...apiRootProfile,
        ...shop(apiRoot),
        [shop('searchCatalog')]: productUris.getCatalogSearchUri(),
        [shop('shoppingCart')]: shoppingCartUris.getRootUri(),
        [shop('orderList')]: orderUris.getRootUri(),
        [shop('userProfile')]: userProfileUris.getRootUri()
    };
}
