import * as express from 'express';
import { jsonHal } from '../shared/mediaType';
import { sendResponse } from '../shared/util';
import * as hal from './hal';
import * as html from './html';
import * as productService from './service';
import { getBasePath, getProductPath, getRootPath } from './uris';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => sendResponse(response, {
            json: products,
            html: html.fromProducts(products),
            [jsonHal]: hal.fromProducts(products)
        }));
});

router.get(getProductPath(), (request, response) => {
    productService.getProduct(request.params.productId)
        .then(product => sendResponse(response, {
            json: product,
            html: html.fromProduct(product),
            [jsonHal]: hal.fromProduct(product)
        }));
});
