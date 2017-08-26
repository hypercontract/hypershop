const express = require('express');

const userProfileService = require('./service');
const { getBasePath, getRootPath } = require('./uris');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    userProfileService.getUserProfile()
        .then(userProfile => response.json(userProfile));
});

module.exports = {
    basePath: getBasePath(),
    router
};

