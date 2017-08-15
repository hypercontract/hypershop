const Datastore = require('nedb');
const faker = require('faker');

class Database {

    constructor(initialData = []) {
        this.db = new Datastore();
        this.bulkInsert(initialData);
    }

    findOne(entityId) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: entityId }, (error, entity) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entity);
            });
        });
    }

    find(query = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(query, (error, entity) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entity);
            });
        });
    }

    insert(entity) {
        return this.bulkInsert([entity])
            .then(entityIds => entityIds[0]);
    }

    bulkInsert(entities) {
        return new Promise((resolve, reject) => {
            this.db.insert(generateIds(entities), (error, entities) => {
                if (error) {
                    return reject(error);
                }
                return resolve(entities.map(entity => entity._id));
            });
        });
    }

    update(entityId, updatedEntity) {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: entityId }, { $set: updatedEntity }, {}, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

    remove(entityId) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: entityId }, {}, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }

}

function generateIds(entities) {
    return entities.map(entity => Object.assign(
        { _id: faker.random.uuid() },
        entity
    ));
}

module.exports = Database;