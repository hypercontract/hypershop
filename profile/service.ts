import * as jsonld from 'jsonld';
import { filter, find, isArray, isEmpty, isUndefined, omit } from 'lodash';
import { rdfs, shop } from '../shared/namespaces';
import cfhaVocabulary from './cfha.json';
import context from './context.json';
import domainProfile from './profile.json';

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
    return filter(domainProfile, (resource: any) => {
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