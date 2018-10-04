import { createOrGetStore } from '../store/quadStoreFactory';
import { profile } from './profile';

export function getProfileStore() {
    return createOrGetStore('profile', profile);
}
