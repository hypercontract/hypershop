import { createOrGetStore } from '../../shared/storeFactory';
import { Address } from '../model';

export function getAddressStore() {
    return createOrGetStore<Address>('address');
}
