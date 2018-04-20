import { isNull } from 'lodash';
import * as rootUris from '../root/uris';
import { EntityId } from '../shared/store';

export function getBasePath() {
    return '/orders';
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

export function getOrderPath(id: EntityId | null = null) {
    const pathTemplate = getRootPath() + ':orderId/';

    if (!isNull(id)) {
        return pathTemplate.replace(':orderId', id!);
    }

    return pathTemplate;
}

export function getOrderUri(id: EntityId) {
    return getBaseUri() + getOrderPath(id);
}
