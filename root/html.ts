import * as orderUris from '../orders/uris';
import * as productUris from '../products/uris';
import * as shoppingCartUris from '../shoppingCart/uris';
import * as userProfileUris from '../userProfile/uris';
import { ApiRoot } from './model';

const activeNavItem = 'root';

export function fromApiRoot(apiRoot: ApiRoot) {
    return [
        'root/index',
        {
            activeNavItem,
            links: {
                searchCatalog: productUris.getRootUri(),
                shoppingCart: shoppingCartUris.getRootUri(),
                orders: orderUris.getRootUri(),
                userProfile: userProfileUris.getRootUri()
            }
        }
    ];
}
