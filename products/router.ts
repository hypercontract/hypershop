import * as express from 'express';
import { jsonHal, jsonLd } from '../shared/mediaType';
import { sendResponse } from '../shared/util';
import * as hal from './hal';
import * as html from './html';
import * as ld from './ld';
import * as productService from './service';
import { getBasePath, getProductPath, getRootPath } from './uris';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    const query = request.query.query;

    productService.findProducts(query)
        .then(products => sendResponse(response, {
            json: products,
            html: html.fromProducts(products),
            [jsonHal]: hal.fromProducts(products, query),
            [jsonLd]: ld.fromProducts(products, query)
        }));
});

router.get(getProductPath(), (request, response) => {
    productService.getProduct(request.params.productId)
        .then(product => sendResponse(response, {
            json: product,
            html: html.fromProduct(product),
            [jsonLd]: ld.fromProduct(product)
        }));
});
