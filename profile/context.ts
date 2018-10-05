import { addContext, compact, prefixes, toJsonLd } from '@hypercontract/hypercontract-shared';
import { profileBaseUri } from './namespaces';

const vocabularyContext = {
    ...prefixes
};

const domainContext = {
    '@vocab': profileBaseUri,
    ...vocabularyContext
};

export function addDomainContext(input: any) {
    return addContext(input, domainContext);
}

export function compactWithDomainContext(input: any) {
    return compact(input, domainContext);
}

export function toJsonLdWithDomainContext(input: any) {
    return toJsonLd(input, domainContext);
}
