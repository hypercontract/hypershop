import { map, omit } from 'lodash';
import { shop } from '../profile/namespaces';
import { Address, PaymentOption, UserProfile } from './model';
import { getAddressUri, getPaymentOptionUri, getRootUri } from './uris';

export function fromUserProfile(userProfile: UserProfile) {
    return {
        '@context': {
            addresses: {
                '@id': shop('addresses'),
                '@container': '@set'
            },
            paymentOptions: {
                '@id': shop('paymentOptions'),
                '@container': '@set'
            }
        },
        '@id': getRootUri(),
        '@type': shop('UserProfile'),
        ...shop(omit(userProfile, ['addresses', 'paymentOptions'])),
        [shop('addresses')]: map(userProfile.addresses, fromAddress),
        [shop('paymentOptions')]: map(userProfile.paymentOptions, fromPaymentOption)
    };
}

export function fromAddress(address: Address) {
    return {
        '@id': getAddressUri(address._id!),
        '@type': shop('Address'),
        ...shop(omit(address, ['_id']))
    };
}

export function fromPaymentOption(paymentOption: PaymentOption) {
    return {
        '@id': getPaymentOptionUri(paymentOption._id!),
        '@type': shop('PaymentOption'),
        ...shop(omit(paymentOption, ['_id']))
    };
}
