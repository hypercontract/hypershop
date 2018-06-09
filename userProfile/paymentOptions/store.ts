import { createOrGetStore } from '../../shared/storeFactory';
import { PaymentOption } from '../model';

export function getPaymentOptionStore() {
    return createOrGetStore<PaymentOption>('paymentOption');
}
