import { filter, find, isArray, isEmpty, isUndefined } from 'lodash';
import * as rootUris from '../root/uris';
import { compactWithDomainContext } from './context';
import { shop } from './namespaces';
import { profile as domainProfile } from './profile';

export type Uri = string;

export function getProfile() {
    return compactWithDomainContext(domainProfile);
}

export function getResource(name: string) {
    const uri = shop(name);

    const graph = [
        getResourceByUri(uri),
        ...getPropertiesByDomain(uri)
    ];

    if (isEmpty(graph)) {
        return Promise.resolve(null);
    }

    return (<Promise<any>> compactWithDomainContext(
        { '@graph': graph }
    ));
}

export function getApiRootResource() {
    return getResourceByUri(rootUris.getRootUri());
}

function getResourceByUri(uri: Uri) {
    return find(domainProfile['@graph'], { '@id': uri });
}

function getPropertiesByDomain(domainUri: Uri) {
    return filter(domainProfile['@graph'], (resource: any) => {
        const domain = resource[`rdfs:domain`];
        return (
            isArray(domain) &&
            (!isUndefined(find(domain, { '@id': domainUri })))
        );
    });
}
