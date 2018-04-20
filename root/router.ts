import * as express from 'express';
import * as config from 'config';
import { apiRoot } from './root';
import * as hal from './hal';
import * as html from './html';
import { sendResponse } from '../shared/util';
import { getRootPath } from './uris';

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    sendResponse(response, {
        'json': apiRoot,
        'html': html.fromApiRoot(apiRoot),
        [config.app.mediaType.hal]: hal.fromApiRoot(apiRoot)
    });
});
