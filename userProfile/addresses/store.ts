import { createOrGetStore } from '../../store/storeFactory';
import { Address } from '../model';

export function getAddressStore() {
    return createOrGetStore<Address>('address');
}
