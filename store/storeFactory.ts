import config from 'config';
import { MongoClient } from 'mongodb';
import { NeDBStore } from '../store/nedbStore';
import { Store, StoreType } from './model';
import { MongoDBStore } from './mongodbStore';

const stores = new Map<string, Store<any>>();

export function createOrGetStore<T>(name: string) {
    if (stores.has(name)) {
        return Promise.resolve(stores.get(name)!);
    }

    return createStore<T>(name)
        .then((store: Store<T>) => {
            stores.set(name, store);
            return store;
        });
}

function createStore<T>(name: string): Promise<Store<T>> {
    const type = config.get('db.type');

    switch (type) {
        case StoreType.NeDB:
            return createNeDBStore<T>(name);

        case StoreType.MongoDB:
            return createMongoDBStore<T>(name);

        default:
            throw new Error(`${type} is not a valid database type.`);
    }
}

function createMongoDBStore<T>(name: string) {
    const connectionString = config.get('db.connection');

    return new Promise<MongoDBStore<T>>((resolve, reject) => {
        MongoClient.connect(connectionString, (error, client) => {
            if (error) {
                reject(error);
            }

            const store = new MongoDBStore<T>(name, client.db('hypershop'));
            resolve(store);
        });
    });
}

function createNeDBStore<T>(name: string) {
    return Promise.resolve(new NeDBStore<T>(name));
}
