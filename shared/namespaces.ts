import * as config from 'config';

export const shop = (name: string) => config.app.namespace + name;
export const cfha = (name: string) => `http://cfha.luchs.org/#${name}`;
export const owl = (name: string) => `http://www.w3.org/2002/07/owl#${name}`;
export const rdfs = (name: string) => `http://www.w3.org/2000/01/rdf-schema#${name}`;
