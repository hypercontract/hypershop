import * as express from 'express';
import { isEmpty, omit } from 'lodash';
import { jsonLd } from '../shared/mediaType';
import { getProfile, getResource } from './service';
import { getBasePath, getResourcePath, getRootPath } from './uris';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    getProfile()
        .then(profile => response
            .type(jsonLd)
            .send(profile)
        );
});

router.get(getResourcePath(), (request, response) => {
    getResource(request.url.substr(1))
        .then((resource: any) => {
            if (isEmpty(omit(resource, ['@context']))) {
                response.sendStatus(404);
                return;
            }

            response
                .type(jsonLd)
                .send(resource);
        });
});
