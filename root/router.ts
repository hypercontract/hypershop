import config from 'config';
import * as express from 'express';
import { sendResponse } from '../shared/util';
import * as hal from './hal';
import * as html from './html';
import { apiRoot } from './root';
import { getRootPath } from './uris';

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    sendResponse(response, {
        'json': apiRoot,
        'html': html.fromApiRoot(apiRoot),
        [config.app.mediaType.hal]: hal.fromApiRoot(apiRoot)
    });
});
