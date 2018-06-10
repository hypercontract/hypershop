import * as Datastore from 'nedb';
import { Entity, EntityId, Store } from "./model";
import { generateIds } from "./util";

export class NeDBStore<T extends Entity> implements Store<T> {

    private name: string;
    private dataStore: Datastore;

    constructor(name: string) {
        this.name = name;
        this.dataStore = new Datastore();
    }

    findOne(entityId: EntityId) {
        return new Promise<T>((resolve, reject) => {
            this.dataStore.findOne({ _id: entityId }, (error: any, entity: T) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entity);
            });
        });
    }

    find(query = {}) {
        return new Promise<T[]>((resolve, reject) => {
            this.dataStore.find(query, (error: any, entities: T[]) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entities);
            });
        });
    }

    insert(entity: T) {
        return this.bulkInsert([entity])
            .then((entityIds: EntityId[]) => entityIds[0]);
    }

    bulkInsert(entities: T[]) {
        return new Promise<EntityId[]>((resolve, reject) => {
            this.dataStore.insert(generateIds(entities), (error: any, entities: T[]) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entities.map(entity => entity._id!));
            });
        });
    }

    update(entityId: EntityId, updatedEntity: Partial<T>) {
        return new Promise<void>((resolve, reject) => {
            this.dataStore.update({ _id: entityId }, { $set: updatedEntity }, {}, (error: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    remove(entityId: EntityId) {
        return new Promise<void>((resolve, reject) => {
            this.dataStore.remove({ _id: entityId }, {}, (error: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    removeAll() {
        return new Promise<void>((resolve, reject) => {
            this.dataStore.remove({}, { multi: true }, (error: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

}
