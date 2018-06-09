import * as Datastore from 'nedb';
import { Store } from "./store";

const stores = new Map<string, Store<any>>();

export function createOrGetStore<T>(name: string) {
    if (stores.has(name)) {
        return Promise.resolve(stores.get(name)!);
    }

    const store = new Store<T>(new Datastore());
    stores.set(name, store);

    return Promise.resolve(store);
}