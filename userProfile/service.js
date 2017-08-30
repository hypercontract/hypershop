const addressStore = require('./addresses/store');
const paymentOptionStore = require('./paymentOptions/store');

module.exports = {
    getUserProfile,
    getAddress,
    getPaymentOption
};

function getUserProfile() {
    return Promise.all(
        [
            paymentOptionStore.find(),
            addressStore.find()
        ]
    )
        .then(([paymentOptions, addresses]) => {
            return {
                paymentOptions,
                addresses
            };
        });
}

function getAddress(id) {
    return addressStore.findOne(id);
}

function getPaymentOption(id) {
    return paymentOptionStore.findOne(id);
}