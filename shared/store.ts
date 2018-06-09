import * as faker from 'faker';

export type EntityId = string;

export interface Entity {
    _id?: EntityId;
}

export class Store<T extends Entity> {

    private dbConnection: any;

    constructor(dbConnection: any, initialData: T[] = []) {
        this.dbConnection = dbConnection;
        this.bulkInsert(initialData);
    }

    findOne(entityId: EntityId) {
        return new Promise<T>((resolve, reject) => {
            this.dbConnection.findOne({ _id: entityId }, (error: any, entity: T) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entity);
            });
        });
    }

    find(query = {}) {
        return new Promise<T[]>((resolve, reject) => {
            this.dbConnection.find(query, (error: any, entities: T[]) => {
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
            this.dbConnection.insert(generateIds(entities), (error: any, entities: T[]) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entities.map(entity => entity._id!));
            });
        });
    }

    update(entityId: EntityId, updatedEntity: Partial<T>) {
        return new Promise<void>((resolve, reject) => {
            this.dbConnection.update({ _id: entityId }, { $set: updatedEntity }, {}, (error: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    remove(entityId: EntityId) {
        return new Promise<void>((resolve, reject) => {
            this.dbConnection.remove({ _id: entityId }, {}, (error: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    removeAll() {
        return new Promise<void>((resolve, reject) => {
            this.dbConnection.remove({}, { multi: true }, (error: any) => {
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
