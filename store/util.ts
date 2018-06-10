import * as faker from 'faker';

export function generateIds<T>(entities: T[]) {
    return entities.map((entity: T) => Object.assign({ _id: faker.random.uuid() }, entity));
}