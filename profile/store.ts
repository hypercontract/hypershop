import { createOrGetStore } from '@hypercontract/hypercontract-shared';
import { profile } from './profile';

export function getProfileStore() {
    return createOrGetStore('profile', profile);
}
