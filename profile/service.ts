import { fromRDF } from 'jsonld';
import { Quad, Writer } from 'n3';
import * as rootUris from '../root/uris';
import { compactWithDomainContext } from './context';
import { shop } from './namespaces';
import { getProfileStore } from './store';

export function getProfile() {
    return getProfileStore()
        .then(profileStore => profileStore.getAll())
        .then(quads => toJsonLd(quads));
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
        .then(quads => toJsonLd(quads));
}

function toJsonLd(quads: Quad[]) {
    return toGraphObjects(quads)
        .then(graphObjects => compactWithDomainContext({
            '@graph': graphObjects
        }));
}

function toGraphObjects(quads: Quad[]) {
    return new Promise((resolve, reject) => {
        const writer = new Writer({ format: 'n-quads' });
        writer.addQuads(quads);
        writer.end((error, result) => {
            if (error) {
                return reject(error);
            }

            fromRDF(result, { format: 'application/n-quads' }, (err, doc) => {
                if (err) {
                    return reject(err);
                }

                return resolve(doc);
            });
        });
    });
}
