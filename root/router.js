const express = require('express');
const config = require('config');

const { getRootPath } = require('./uris');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    response
        .json({
            version: config.get('app.version')
        });
});

module.exports = {
    router
};
