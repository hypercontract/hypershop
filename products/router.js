const express = require('express');
const config = require('config');
const hal = require('./hal');
const productService = require('./service');
const { getBasePath, getRootPath } = require('./uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => sendResponse(response, {
            'json': products,
            [config.app.mediaType]: hal.fromProducts(products)
        }));
});

module.exports = {
    basePath: getBasePath(),
    router
};
