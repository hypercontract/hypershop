import { isNull } from 'lodash';
import * as rootUris from '../root/uris';
import { EntityId } from '../shared/store';

export function getBasePath() {
    return '/userProfile';
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

export function getAddressPath(id: EntityId | null = null) {
    const pathTemplate = getRootPath() + 'addresses/:addressId/';
    
    if (!isNull(id)) {
        return pathTemplate.replace(':addressId', id);
    }

    return pathTemplate;
}

export function getAddressUri(id: EntityId | null = null) {
    return getBaseUri() + getAddressPath(id);
}

export function getPaymentOptionPath(id: EntityId | null) {
    const pathTemplate = getRootPath() + 'paymentOptions/:paymentOptionId/';
    
    if (!isNull(id)) {
        return pathTemplate.replace(':paymentOptionId', id);
    }

    return pathTemplate;
}

export function getPaymentOptionUri(id: EntityId | null) {
    return getBaseUri() + getPaymentOptionPath(id);
}
