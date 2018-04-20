import * as productUris from '../products/uris';
import * as shoppingCartUris from '../shoppingCart/uris';
import * as orderUris from '../orders/uris';
import * as userProfileUris from '../userProfile/uris';
import { ApiRoot } from './model';

export function fromApiRoot(apiRoot: ApiRoot) {
    return [
        'root/index',
        {
            links: {
                searchCatalog: productUris.getRootUri(),
                shoppingCart: shoppingCartUris.getRootUri(),
                orders: orderUris.getRootUri(),
                userProfile: userProfileUris.getRootUri()
            }
        }
    ];
}
