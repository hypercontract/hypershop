import * as express from 'express';
import { jsonHalWithProfile, jsonLdWithProfile } from '../shared/mediaType';
import { sendResponse } from '../shared/util';
import * as hal from './hal';
import * as html from './html';
import * as ld from './ld';
import * as userProfileService from './service';
import { getBasePath, getRootPath } from './uris';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    userProfileService.getUserProfile()
        .then(userProfile => sendResponse(response, {
            json: userProfile,
            html: html.fromUserProfile(userProfile),
            [jsonHalWithProfile]: hal.fromUserProfile(userProfile),
            [jsonLdWithProfile]: ld.fromUserProfile(userProfile)
        }));
});
