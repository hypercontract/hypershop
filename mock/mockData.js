const faker = require('faker');
const moment = require('moment');
const { random, sample, times, toNumber } = require('lodash');

const productStore = require('../products/store');
const orderStore = require('../orders/store');
const addressStore = require('../userProfile/addresses/store');
const paymentOptionStore = require('../userProfile/paymentOptions/store');

module.exports = {
    create() {
        addressStore.bulkInsert(times(3, () => generateAddress()));
        paymentOptionStore.bulkInsert(times(2, () => generatePaymentOption()));
        orderStore.bulkInsert(times(5, () => generateOrder()));
        productStore.bulkInsert(times(100, () => generateProduct()));
    }
};

function generateAddress(values = {}) {
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

function generateOrder(values = {}) {
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
            payment: Object.assign(
                { _id: faker.random.uuid() },
                generatePaymentOption()
            ),
            billingAddress: Object.assign(
                { _id: faker.random.uuid() },
                generateAddress()
            ),
            shippingAddress: Object.assign(
                { _id: faker.random.uuid() },
                generateAddress()
            )
        },
        values
    );
}

function generatePaymentOption(values = {}) {
    return Object.assign(
        {
            accountOwner: faker.name.findName(),
            iban: faker.finance.iban(),
            bic: faker.finance.bic()
        },
        values
    );
}

function generateProduct(values = {}) {
    return Object.assign(
        {
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            price: toNumber(random(0.20, 90).toFixed(2))
        },
        values
    );
}
