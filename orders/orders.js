const faker = require('faker');
const moment = require('moment');
const { sample, times } = require('lodash');

const Database = require('../shared/database');

const db = new Database(
    times(5, () => generate())
);

function generate(values = {}) {
    return Object.assign(
        {
            date: moment(faker.date.past()).format(),
            status: sample([
                'Cancelled',
                'Delivered',
                'InTransit',
                'PaymentDue',
                'PickupAvailable',
                'Problem',
                'Processing',
                'Returned'
            ]),
            items: [],
            payment: {},
            billingAddress: {},
            shippingAddress: {}
        },
        values
    );
}

module.exports = db;
