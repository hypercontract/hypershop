const express = require('express');
const config = require('config');
const apiRoot = require('./root');
const hal = require('./hal');
const { sendResponse } = require('../shared/util');
const { getRootPath } = require('./uris');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    sendResponse(response, {
        'json': apiRoot,
        [config.app.mediaType]: hal.fromApiRoot(apiRoot)
    });
});

module.exports = {
    router
};
