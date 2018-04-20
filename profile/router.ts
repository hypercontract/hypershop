import * as express from 'express';
import { isEmpty, omit } from 'lodash';
import { getBasePath, getRootPath, getResourcePath } from './uris';
import { getProfile, getCFHAVocabulary, getResource } from './service';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    getProfile()
        .then(profile => response
            .type('application/ld+json')
            .send(profile)
        );
});

router.get(getResourcePath('cfha'), (request, response) => {
    getCFHAVocabulary()
        .then(profile => response
            .type('application/ld+json')
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
                .type('application/ld+json')
                .send(resource);
        });
});
