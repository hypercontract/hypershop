const { Resource } = require('hal');
const { map } = require('lodash');
const { getRootUri, getAddressUri, getPaymentOptionUri } = require('./uris');

module.exports = {
    fromUserProfile,
    fromAddress,
    fromPaymentOption
};

function fromUserProfile(userProfile) {
    return Resource(
        Object.assign(
            {},
            userProfile,
            {
                addresses: map(userProfile.addresses, fromAddress),
                paymentOptions: map(userProfile.paymentOptions, fromPaymentOption)
            }
        ),
        getRootUri()
    );
}

function fromAddress(address) {
    return Resource(address, getAddressUri(address._id));
}

function fromPaymentOption(paymentOption) {
    return Resource(paymentOption, getPaymentOptionUri(paymentOption._id));
}
