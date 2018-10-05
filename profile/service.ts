import { toGraphObjects } from '@hypercontract/hypercontract-shared';
import * as rootUris from '../root/uris';
import { toJsonLdWithDomainContext } from './context';
import { shop } from './namespaces';
import { getProfileStore } from './store';

export function getProfile() {
    return getProfileStore()
        .then(profileStore => profileStore.getAll())
        .then(quads => toJsonLdWithDomainContext(quads));
}

export function getResource(name: string) {
    const uri = shop(name);
    return getResourceByUri(uri);
}

export function getApiRootProfile() {
    return getProfileStore()
        .then(profileStore => profileStore.getBySubject(rootUris.getRootUri()))
        .then(quads => toGraphObjects(quads))
        .then(jsonLd => jsonLd[0]);
}

function getResourceByUri(uri: string) {
    return getProfileStore()
        .then(profileStore => profileStore.get(uri))
        .then(quads => toJsonLdWithDomainContext(quads));
}
