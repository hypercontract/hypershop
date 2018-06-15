import * as express from 'express';
import { jsonHal } from '../shared/mediaType';
import { sendResponse } from '../shared/util';
import * as hal from './hal';
import * as html from './html';
import { apiRoot } from './root';
import { getRootPath } from './uris';

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    sendResponse(response, {
        json: apiRoot,
        html: html.fromApiRoot(apiRoot),
        [jsonHal]: hal.fromApiRoot(apiRoot)
    });
});
