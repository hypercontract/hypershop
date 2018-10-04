import { compact as compactJsonLd } from 'jsonld';
import { defaultTo, omit } from 'lodash';
import { prefixes, profileBaseUri } from './namespaces';

type Context = any;

const vocabularyContext = {
    ...prefixes
};

const domainContext = {
    '@vocab': profileBaseUri,
    ...vocabularyContext
};

export function compactWithDomainContext(input: any) {
    return compact(input, domainContext);
}

function compact(input: any, context: Context) {
    return new Promise((resolve, reject) => {
        const inputContext = defaultTo(input['@context'], {});

        compactJsonLd(
            omit(input, ['@context']),
            {
                ...context,
                ...inputContext
            },
            (error: any, output: any) => {
                if (error) {
                    reject(error);
                }

                resolve(output);
            }
        );
    });
}
