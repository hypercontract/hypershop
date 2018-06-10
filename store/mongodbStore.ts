import { noop } from 'lodash';
import { Collection, Db } from 'mongodb';
import { Entity, EntityId, Store } from "./model";
import { generateIds } from "./util";

export class MongoDBStore<T extends Entity> implements Store<T> {

    private name: string;
    private collection: Collection<T>;

    constructor(name: string, db: Db) {
        this.name = name;
        this.collection = db.collection(name);
    }

    findOne(entityId: EntityId) {
        return this.collection.findOne({ _id: entityId });
    }

    find(query = {}) {
        return this.collection.find(query).toArray();
    }

    insert(entity: T) {
        return this.bulkInsert([entity])
            .then((entityIds: EntityId[]) => entityIds[0]);
    }

    bulkInsert(entities: T[]): Promise<string[]> {
        return this.collection.insertMany(generateIds(entities))
            .then(x => <any> x.insertedIds);
    }

    update(entityId: EntityId, updatedEntity: Partial<T>) {
        return this.collection.update({ _id: entityId }, { $set: updatedEntity })
            .then(noop);
    }

    remove(entityId: EntityId) {
        return this.collection.remove({ _id: entityId })
            .then(noop);
    }

    removeAll() {
        return this.collection.remove({})
            .then(noop);
    }

}
