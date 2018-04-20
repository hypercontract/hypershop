import { isNull } from 'lodash';
import * as rootUris from '../root/uris';
import { EntityId } from '../shared/store';

export function getBasePath() {
    return '/shoppingCart';
}

export function getBaseUri() {
    return rootUris.getBaseUri() + getBasePath();
}

export function getRootPath() {
    return '/';
}

export function getRootUri() {
    return getBaseUri() + getRootPath();
}

export function getShoppingCartItemsPath() {
    return getRootPath() + 'items/';
}

export function getShoppingCartItemsUri() {
    return getBaseUri() + getShoppingCartItemsPath();
}

export function getShoppingCartItemPath(id: EntityId | null = null) {
    const pathTemplate = getShoppingCartItemsPath() + ':shoppingCartItemId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':shoppingCartItemId', id);
    }

    return pathTemplate;
}

export function getShoppingCartItemUri(id: EntityId) {
    return getBaseUri() + getShoppingCartItemPath(id);
}
