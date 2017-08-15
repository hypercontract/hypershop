const faker = require('faker');
const { times } = require('lodash');

const Database = require('../shared/database');

const db = new Database(
    times(2, () => generate())
);

function generate(values = {}) {
    return Object.assign(
        {
            accountOwner: faker.name.findName(),
            iban: faker.finance.iban(),
            bic: faker.finance.bic()
        },
        values
    );
}

module.exports = db;