import * as config from 'config';

export function getBaseUri() {
    const scheme = config.get('http.scheme');
    const hostname = config.get('http.hostname');
    const port = config.get('http.port');
    const uri = `${scheme}://${hostname}`;
    return omitPort(scheme, port) ? uri : `${uri}:${port}`;
}

export function getRootPath() {
    return '/';
}

export function getRootUri() {
    return getBaseUri() + getRootPath();
}

function omitPort(scheme: string, port: number) {
    return (scheme === 'http' && port === 80) ||
        (scheme === 'https' && port === 443);
}