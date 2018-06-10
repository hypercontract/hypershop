import { createOrGetStore } from '../../store/storeFactory';
import { PaymentOption } from '../model';

export function getPaymentOptionStore() {
    return createOrGetStore<PaymentOption>('paymentOption');
}
