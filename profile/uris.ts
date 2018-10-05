import { isNull } from 'lodash';
import * as rootUris from '../root/uris';

export function getBasePath() {
    return '/profile';
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

export function getResourcePath(resourceName: string | null = null) {
    const pathTemplate = getRootPath() + ':resourceName/';

    if (!isNull(resourceName)) {
        return pathTemplate.replace(':resourceName', resourceName);
    }

    return pathTemplate;
}

export function getResourceUri(resourceName: string) {
    return getBaseUri() + getResourcePath(resourceName);
}
