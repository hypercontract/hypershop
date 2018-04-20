import * as config from 'config';
import { ApiRoot } from './model';

export const apiRoot: ApiRoot = {
    version: config.get('app.version')
};
