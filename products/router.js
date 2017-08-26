const express = require('express');
const productService = require('./service');

const basePath = '/products';

const router = express.Router();

router.get('/', (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => response.json(products));
});

module.exports = {
    basePath,
    router
};
