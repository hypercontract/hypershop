import { prefixes, profileBaseUri } from './namespaces';

const vocabularyContext = {
    ...prefixes
};

export const domainContext = {
    '@vocab': profileBaseUri,
    ...vocabularyContext
};
