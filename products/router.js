const express = require('express');
const hal = require('./hal');
const productService = require('./service');
const { getBasePath, getRootPath } = require('./uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => sendResponse(response, {
            'json': products,
            'application/hal+json': hal.fromProducts(products)
        }));
});

module.exports = {
    basePath: getBasePath(),
    router
};
