const express = require('express');
const apiRoot = require('./root');
const hal = require('./hal');
const { sendResponse } = require('../shared/util');
const { getRootPath } = require('./uris');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    sendResponse(response, {
        'json': apiRoot,
        'application/hal+json': hal.fromApiRoot(apiRoot)
    });
});

module.exports = {
    router
};
