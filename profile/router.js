const express = require('express');
const { isEmpty, omit } = require('lodash');
const { getBasePath, getRootPath, getResourcePath } = require('./uris');
const { getProfile, getCFHAVocabulary, getResource } = require('./service');

const router = express.Router();

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
        .then(resource => {
            if (isEmpty(omit(resource, ['@context']))) {
                response.sendStatus(404);
                return;
            }

            response
                .type('application/ld+json')
                .send(resource);
        });
});

module.exports = {
    basePath: getBasePath(),
    router
};