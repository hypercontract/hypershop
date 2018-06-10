import { EntityId } from '../store/model';
import { getAddressStore } from './addresses/store';
import { getPaymentOptionStore } from './paymentOptions/store';

export function getUserProfile() {
    return Promise.all([
        getPaymentOptionStore(),
        getAddressStore()
    ])
        .then(([paymentOptionStore, addressStore]) => {
            return Promise.all([
                paymentOptionStore.find(),
                addressStore.find()
            ])
                .then(([paymentOptions, addresses]) => {
                    return {
                        paymentOptions,
                        addresses
                    };
                });
        });
}

export function getAddress(id: EntityId) {
    return getAddressStore()
        .then(addressStore => addressStore.findOne(id));
}

export function getPaymentOption(id: EntityId) {
    return getPaymentOptionStore()
        .then(paymentOptionStore => paymentOptionStore.findOne(id));
}