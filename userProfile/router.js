const express = require('express');
const config = require('config');
const hal = require('./hal');
const userProfileService = require('./service');
const { getBasePath, getRootPath } = require('./uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    userProfileService.getUserProfile()
        .then(userProfile => sendResponse(response, {
            'json': userProfile,
            [config.app.mediaType]: hal.fromUserProfile(userProfile)
        }));
});

module.exports = {
    basePath: getBasePath(),
    router
};

