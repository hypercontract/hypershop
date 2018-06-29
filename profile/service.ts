import * as jsonld from 'jsonld';
import { filter, find, isArray, isEmpty, isUndefined } from 'lodash';
import cfhaVocabulary from './cfha.json';
import { domainContext, vocabularyContext } from './context';
import { shop } from './namespaces';
import { profile as domainProfile } from './profile';

export type Uri = string;
export type Context = any;

export function getProfile() {
    return addDomainContext(domainProfile);
}

export function getCFHAVocabulary() {
    return addVocabularyContext(cfhaVocabulary);
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

    return (<Promise<any>> addVocabularyContext(
        { '@graph': graph }
    ));
}

export function addVocabularyContext(input: any) {
    return addContext(input, vocabularyContext);
}

export function addDomainContext(input: any) {
    return addContext(input, domainContext);
}

function addContext(input: any, context: any) {
    return compact(input, context);
}

function getResourceByUri(uri: Uri) {
    return find(domainProfile, { '@id': uri });
}

function getPropertiesByDomain(domainUri: Uri) {
    return filter(domainProfile, (resource: any) => {
        const domain = resource[`rdfs:domain`];
        return (
            isArray(domain) &&
            (!isUndefined(find(domain, { '@id': domainUri })))
        );
    });
}

function compact(input: any, context: Context) {
    return new Promise((resolve, reject) => {
        jsonld.compact(
            input,
            context,
            (error: any, output: any) => {
                if (error) {
                    reject(error);
                }

                resolve(output);
            }
        );
    });
}
