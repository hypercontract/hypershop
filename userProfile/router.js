const express = require('express');

const userProfileService = require('./service');

const basePath = '/userProfile';

const router = express.Router();

router.get('/', (request, response) => {
    userProfileService.getUserProfile()
        .then(userProfile => response.json(userProfile));
});

module.exports = {
    basePath,
    router
};

