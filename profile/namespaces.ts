import { createUriFactory } from '@hypercontract/hypercontract-shared';
import { getRootUri } from '../root/uris';

export const profileBaseUri = `${getRootUri()}profile/`;
export const shop = createUriFactory(profileBaseUri);
