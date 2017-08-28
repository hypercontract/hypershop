const { Resource } = require('hal');
const { map, omit } = require('lodash');
const { getRootUri, getAddressUri, getPaymentOptionUri } = require('./uris');
const { cfha } = require('../shared/namespaces');

module.exports = {
    fromUserProfile,
    fromAddress,
    fromPaymentOption
};

function fromUserProfile(userProfile) {
    return Resource(
        omit(userProfile, ['addresses', 'paymentOptions']),
        getRootUri()
    )
        .embed(
            cfha('addresses'),
            map(userProfile.addresses, fromAddress)
        )
        .embed(
            cfha('payment-options'),
            map(userProfile.paymentOptions, fromPaymentOption)
        );
}

function fromAddress(address) {
    return Resource(address, getAddressUri(address._id));
}

function fromPaymentOption(paymentOption) {
    return Resource(paymentOption, getPaymentOptionUri(paymentOption._id));
}
