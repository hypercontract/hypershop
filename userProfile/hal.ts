import { Resource } from 'hal';
import { map, omit } from 'lodash';
import { getRootUri, getAddressUri, getPaymentOptionUri } from './uris';
import { shop } from '../shared/namespaces';
import { UserProfile, PaymentOption, Address } from './model';

export function fromUserProfile(userProfile: UserProfile) {
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

export function fromAddress(address: Address) {
    return Resource(
        omit(address, ['_id']),
        getAddressUri(address._id)
    );
}

export function fromPaymentOption(paymentOption: PaymentOption) {
    return Resource(
        omit(paymentOption, ['_id']),
        getPaymentOptionUri(paymentOption._id!)
    );
}
