import { isNull } from 'lodash';
import * as rootUris from '../root/uris';
import { EntityId } from '../shared/store';

export function getBasePath() {
    return '/products';
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

export function getRootUriTemplate() {
    return getRootUri() + '{?query}';
}

export function getProductPath(id: EntityId | null = null) {
    const pathTemplate = getRootPath() + ':productId/';
    
    if (!isNull(id)) {
        return pathTemplate.replace(':productId', id);
    }

    return pathTemplate;
}

export function getProductUri(id: EntityId) {
    return getBaseUri() + getProductPath(id);
}
