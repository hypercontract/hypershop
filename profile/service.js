const jsonld = require('jsonld');
const { isArray, isEmpty, isUndefined, filter, find, omit } = require('lodash');
const { shop, rdfs } = require('../shared/namespaces');

// @ts-ignore
const context = require('./context.json');
// @ts-ignore
const domainProfile = require('./profile.json');
// @ts-ignore
const cfhaVocabulary = require('./cfha.json');

module.exports = {
    getProfile,
    getResource,
    getCFHAVocabulary
};

function getProfile() {
    return compact(domainProfile, context);
}

function getCFHAVocabulary() {
    return compact(cfhaVocabulary, omit(context, ['shop']));
}

function getResource(name) {
    const uri = shop(name);

    const graph = [
        getResourceByUri(uri),
        ...getPropertiesByDomain(uri)
    ];

    if (isEmpty(graph)) {
        return null;
    }

    return compact(
        { '@graph': graph },
        context
    );
}



function getResourceByUri(uri) {
    return find(domainProfile, { '@id': uri });
}

function getPropertiesByDomain(domainUri) {
    return filter(domainProfile, (resource) => {
        const domain = resource[rdfs('domain')];
        return (
            isArray(domain) &&
            (!isUndefined(find(domain, { '@id': domainUri })))
        );
    });
}

function compact(input, context) {
    return new Promise((resolve, reject) => {
        jsonld.compact(
            input,
            context,
            (error, output) => {
                if (error) {
                    reject(error);
                }

                resolve(output);
            }
        );
    });
}