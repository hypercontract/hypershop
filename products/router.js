const express = require('express');
const config = require('config');
const hal = require('./hal');
const html = require('./html');
const productService = require('./service');
const { getBasePath, getRootPath, getProductPath } = require('./uris');
const { sendResponse } = require('../shared/util');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => sendResponse(response, {
            'json': products,
            'html': html.fromProducts(products),
            [config.app.mediaType]: hal.fromProducts(products)
        }));
});

router.get(getProductPath(), (request, response) => {
    productService.getProduct(request.params.productId)
        .then(product => sendResponse(response, {
            'json': product,
            'html': html.fromProduct(product),
            [config.app.mediaType]: hal.fromProduct(product)
        }));
});

module.exports = {
    basePath: getBasePath(),
    router
};
