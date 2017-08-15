const express = require('express');
const config = require('config');

const basePath = '/';

const router = express.Router();

router.get('/', (request, response) => {
    response
        .status(200)
        .json({
            version: config.get('app.version')
        });
});

module.exports = {
    basePath,
    router
};
