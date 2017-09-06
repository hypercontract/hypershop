const { Resource } = require('hal');
const { map, omit } = require('lodash');
const { getRootUri, getAddressUri, getPaymentOptionUri } = require('./uris');
const { shop } = require('../shared/namespaces');

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
            shop('addresses'),
            map(userProfile.addresses, fromAddress)
        )
        .embed(
            shop('paymentOptions'),
            map(userProfile.paymentOptions, fromPaymentOption)
        );
}

function fromAddress(address) {
    return Resource(
        omit(address, ['_id']),
        getAddressUri(address._id)
    );
}

function fromPaymentOption(paymentOption) {
    return Resource(
        omit(paymentOption, ['_id']),
        getPaymentOptionUri(paymentOption._id)
    );
}