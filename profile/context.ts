import { profileBaseUri } from './namespaces';

export const context = {
    owl: 'http://www.w3.org/2002/07/owl#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    cfha: 'http://cfha.luchs.org/#',
    shop: profileBaseUri,
    domain: {
        '@id': 'rdfs:domain',
        '@type': '@id'
    },
    range: {
        '@id': 'rdfs:range',
        '@type': '@id'
    },
    subClassOf: {
        '@id': 'rdfs:subClassOf',
        '@type': '@id'
    }
};
