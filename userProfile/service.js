const addressStore = require('./addresses/store');
const paymentOptionStore = require('./paymentOptions/store');

module.exports = {
    getUserProfile
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
