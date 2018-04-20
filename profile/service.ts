import * as jsonld from 'jsonld';
import { isArray, isEmpty, isUndefined, filter, find, omit } from 'lodash';
import { shop, rdfs } from '../shared/namespaces';

// @ts-ignore
import * as context from './context.json';
// @ts-ignore
import * as domainProfile from './profile.json';
// @ts-ignore
import * as cfhaVocabulary from './cfha.json';

export type Uri = string;
export type Context = any;

export function getProfile() {
    return compact(domainProfile, context);
}

export function getCFHAVocabulary() {
    return compact(cfhaVocabulary, omit(context, ['shop']));
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

    return (<Promise<any>> compact(
        { '@graph': graph },
        context
    ));
}

function getResourceByUri(uri: Uri) {
    return find(domainProfile, { '@id': uri });
}

function getPropertiesByDomain(domainUri: Uri) {
    return filter(domainProfile, (resource) => {
        const domain = resource[rdfs('domain')];
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