import * as express from 'express';
import * as config from 'config';
import * as hal from './hal';
import * as userProfileService from './service';
import { getBasePath, getRootPath } from './uris';
import { sendResponse } from '../shared/util';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    userProfileService.getUserProfile()
        .then(userProfile => sendResponse(response, {
            'json': userProfile,
            [config.app.mediaType.hal]: hal.fromUserProfile(userProfile)
        }));
});
