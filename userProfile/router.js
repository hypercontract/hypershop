const express = require('express');

const paymentOptionsStore = require('./paymentOptions');
const addressesStore = require('./addresses');

const basePath = '/userProfile';

const router = express.Router();

router.get('/', (request, response) => {
    Promise.all(
        [
            paymentOptionsStore.find(),
            addressesStore.find()
        ]
    )
        .then(([paymentOptions, addresses]) => {
            response
                .status(200)
                .json({
                    paymentOptions,
                    addresses
                });
        });
});

module.exports = {
    basePath,
    router
};

