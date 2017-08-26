const express = require('express');
const productService = require('./service');
const { getBasePath, getRootPath } = require('./uris');

const router = express.Router();

router.get(getRootPath(), (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => response.json(products));
});

module.exports = {
    basePath: getBasePath(),
    router
};
