import { isNull, isUndefined } from 'lodash';
import { URL } from 'url';
import * as rootUris from '../root/uris';
import { EntityId } from '../store/model';

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

export function getCatalogSearchUri(query?: string) {
    const url = new URL(getRootUri());

    if (!isUndefined(query)) {
        url.searchParams.append('query', query);
    }

    return url.toString();
}

export function getCatalogSearchUriTemplate() {
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
