const faker = require('faker');
const { times } = require('lodash');

const Database = require('../shared/database');

const db = new Database(
    times(3, () => generate())
);

function generate(values = {}) {
    return Object.assign(
        {
            name: faker.name.findName(),
            street: faker.address.streetAddress(),
            zipCode: faker.address.zipCode(),
            city: faker.address.city(),
            country: faker.address.country()
        },
        values
    );
}

module.exports = db;