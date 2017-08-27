const faker = require('faker');
const { random, sample, times, toNumber } = require('lodash');

const productStore = require('../products/store');
const addressStore = require('../userProfile/addresses/store');
const paymentOptionStore = require('../userProfile/paymentOptions/store');
const orderService = require('../orders/service');
const shoppingCartService = require('../shoppingCart/service');

const orderStatusValues = [
    'Cancelled',
    'Delivered',
    'InTransit',
    'PaymentDue',
    'PickupAvailable',
    'Problem',
    'Processing',
    'Returned'
];

module.exports = {
    create() {
        const addresses = times(3, () => generateAddress());
        const paymentOptions = times(2, () => generatePaymentOption());
        const products = times(100, () => generateProduct());

        addressStore.bulkInsert(addresses);
        paymentOptionStore.bulkInsert(paymentOptions);

        return productStore.bulkInsert(products)
            .then(productIds => repeatInSequence(
                5,
                () => createShoppingCart(productIds)
                    .then(shoppingCart => createOrder(shoppingCart, addresses, paymentOptions))
            ));
    }
};

function generateAddress() {
    return {
        name: faker.name.findName(),
        street: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        city: faker.address.city(),
        country: faker.address.country()
    };
}


function generatePaymentOption() {
    return {
        accountOwner: faker.name.findName(),
        iban: faker.finance.iban(),
        bic: faker.finance.bic()
    };
}

function generateProduct() {
    return {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: toNumber(random(0.20, 90).toFixed(2))
    };
}

function createShoppingCart(productIds) {
    return Promise.all(
        times(
            random(1, 3),
            () => createShoppingCartItem(productIds)
        )
    )
        .then(() => shoppingCartService.getShoppingCart());
}

function createShoppingCartItem(productIds) {
    return shoppingCartService.addShoppingCartItem(
        sample(productIds),
        random(1, 5)
    );
}

function createOrder(shoppingCart, addresses, paymentOptions) {
    return orderService.createOrder({
        items: shoppingCart.items,
        billingAddress: sample(addresses),
        shippingAddress: sample(addresses),
        payment: sample(paymentOptions)
    })
        .then(orderId => orderService.updateOrderStatus(
            orderId,
            sample(orderStatusValues)
        ));
}

function repeatInSequence(numberOfRepetitions, promiseFn) {
    return times(
        numberOfRepetitions,
        () => promiseFn
    )
        .reduce(
            (previousPromise, generateOrderFn) => previousPromise.then(generateOrderFn),
            Promise.resolve()
        );
}