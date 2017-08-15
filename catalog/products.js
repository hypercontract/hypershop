const faker = require('faker');
const { random, times, toNumber } = require('lodash');

const Database = require('../shared/database');

const db = new Database(
    times(100, () => generate())
);

function generate(values = {}) {
    return Object.assign(
        {
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            price: toNumber(random(0.20, 90).toFixed(2))
        },
        values
    );
}

module.exports = db;