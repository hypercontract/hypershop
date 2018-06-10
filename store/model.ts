export type EntityId = string;

export interface Entity {
    _id?: EntityId;
}

export enum StoreType {
    NeDB = 'nedb',
    MongoDB = 'mongodb'
}

export interface Store<T extends Entity> {

    findOne(entityId: EntityId): Promise<T | null>;

    find(query?: any): Promise<T[]>;

    insert(entity: T): Promise<EntityId>;

    bulkInsert(entities: T[]): Promise<EntityId[]>;

    update(entityId: EntityId, updatedEntity: Partial<T>): Promise<void>;

    remove(entityId: EntityId): Promise<void>;

    removeAll(): Promise<void>;

}