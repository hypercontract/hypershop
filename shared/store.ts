import * as Datastore from 'nedb';
import * as faker from 'faker';
import { Z_STREAM_ERROR } from 'zlib';

export type EntityId = string;

export interface Entity {
    _id?: EntityId;
}

export class Store<T extends Entity> {

    private db: Datastore;

    constructor(initialData: T[] = []) {
        this.db = new Datastore();
        this.bulkInsert(initialData);
    }

    findOne(entityId: EntityId) {
        return new Promise<T>((resolve, reject) => {
            this.db.findOne({ _id: entityId }, (error, entity: T) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entity);
            });
        });
    }

    find(query = {}) {
        return new Promise<T[]>((resolve, reject) => {
            this.db.find(query, (error: any, entities: T[]) => {
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
            this.db.insert(generateIds(entities), (error, entities: T[]) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entities.map(entity => entity._id!));
            });
        });
    }

    update(entityId: EntityId, updatedEntity: Partial<T>) {
        return new Promise<void>((resolve, reject) => {
            this.db.update({ _id: entityId }, { $set: updatedEntity }, {}, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    remove(entityId: EntityId) {
        return new Promise<void>((resolve, reject) => {
            this.db.remove({ _id: entityId }, {}, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    removeAll() {
        return new Promise<void>((resolve, reject) => {
            this.db.remove({}, { multi: true }, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

}

function generateIds<T>(entities: T[]) {
    return entities.map((entity: T) => Object.assign(
        { _id: faker.random.uuid() },
        entity
    ));
}
