import { addressStore } from './addresses/store';
import { paymentOptionStore } from './paymentOptions/store';
import { EntityId } from '../shared/store';

export function getUserProfile() {
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

export function getAddress(id: EntityId) {
    return addressStore.findOne(id);
}

export function getPaymentOption(id: EntityId) {
    return paymentOptionStore.findOne(id);
}