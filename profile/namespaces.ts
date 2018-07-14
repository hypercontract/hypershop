import { isArray, isString, mapKeys, mapValues } from 'lodash';
import { isObject } from 'util';
import { getRootUri } from '../root/uris';

export const profileBaseUri = `${getRootUri()}profile/`;

export const shop = (name: string | object) => addPrefix(profileBaseUri, name);
export const hyper = (name: string | object) => addPrefix('http://hypercontract.org/#', name);
export const owl = (name: string | object) => addPrefix('http://www.w3.org/2002/07/owl#', name);
export const rdfs = (name: string | object) => addPrefix('http://www.w3.org/2000/01/rdf-schema#', name);

function addPrefix(prefix: string, name: string | object) {
    if (isString(name)) {
        return prefix + name;
    }

    if (isObject(name)) {
        return mapKeysDeep(name, (value, key) => addPrefix(prefix, key));
    }

    throw new Error('Cannot add prefix to given name(s). Invalid object type.');
}

function mapKeysDeep(obj, callback) {
    return mapValues(
        mapKeys(obj, callback),
        value => {
            if (isArray(value)) {
                return value.map(item => mapKeysDeep(item, callback));
            }
            if (isObject(value)) {
                return mapKeysDeep(value, callback);
            }
            return value;
        }
    );
}
