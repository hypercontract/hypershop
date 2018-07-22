import { profileBaseUri } from '../profile/namespaces';

export const html = 'text/html';
export const jsonHalWithProfile = `application/hal+json;profile="${profileBaseUri}"`;
export const jsonLd = `application/ld+json`;
export const jsonLdWithProfile = `${jsonLd};profile="${profileBaseUri}"`;

export const acceptIsHtml = isAccept(html);

export const contentTypeIsJsonHal = isContentType(jsonHalWithProfile);
export const contentTypeIsJsonLd = isContentType(jsonLdWithProfile);

function isContentType(mediaType) {
    return request => request.get('Content-Type') === mediaType;
}

function isAccept(mediaType) {
    return request => {
        const acceptedMediaTypes = request.get('Accept')
            .split(';')[0]
            .split(',');

        return acceptedMediaTypes.includes(html);
    };
}
