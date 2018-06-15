import { getRootUri } from '../root/uris';

export const profileBaseUri = `${getRootUri()}profile/`;

export const shop = (name: string) => `${profileBaseUri}${name}`;
export const cfha = (name: string) => `http://cfha.luchs.org/#${name}`;
export const owl = (name: string) => `http://www.w3.org/2002/07/owl#${name}`;
export const rdfs = (name: string) => `http://www.w3.org/2000/01/rdf-schema#${name}`;
