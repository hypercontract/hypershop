const express = require('express');
const hal = require('./hal');
const userProfileService = require('./service');
const { getBasePath, getRootPath } = require('./uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    userProfileService.getUserProfile()
        .then(userProfile => sendResponse(response, {
            'json': userProfile,
            'application/hal+json': hal.fromUserProfile(userProfile)
        }));
});

module.exports = {
    basePath: getBasePath(),
    router
};

