import { profileBaseUri } from '../profile/namespaces';

export const html = 'text/html';
export const jsonHal = `application/hal+json;profile="${profileBaseUri}"`;
export const jsonLd = `application/ld+json;profile="${profileBaseUri}"`;

export const acceptIsHtml = isAccept(html);

export const contentTypeIsJsonHal = isContentType(jsonHal);
export const contentTypeIsJsonLd = isContentType(jsonLd);

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
