const express = require('express');
const { defaultTo } = require('lodash');

const productsStore = require('./products');

const basePath = '/catalog';

const router = express.Router();

router.get('/', (request, response) => {
    response
        .status(200)
        .json({});
});

router.get('/products', (request, response) => {
    productsStore.find(getQueryMatcher(request.query.query))
        .then(products => {
            response
                .status(200)
                .json(products);
        });
});

function getQueryMatcher(rawQuery) {
    const query = defaultTo(rawQuery, '').toLowerCase();
    return {
        $where: function () {
            return (
                this.name.toLowerCase().indexOf(query) > -1 ||
                this.description.toLowerCase().indexOf(query) > -1
            );
        }
    };
}

module.exports = {
    basePath,
    router
};
