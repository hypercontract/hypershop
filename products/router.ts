import * as express from 'express';
import * as config from 'config';
import * as hal from './hal';
import * as html from './html';
import * as productService from './service';
import { getBasePath, getRootPath, getProductPath } from './uris';
import { sendResponse } from '../shared/util';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    productService.findProducts(request.query.query)
        .then(products => sendResponse(response, {
            'json': products,
            'html': html.fromProducts(products),
            [config.app.mediaType.hal]: hal.fromProducts(products)
        }));
});

router.get(getProductPath(), (request, response) => {
    productService.getProduct(request.params.productId)
        .then(product => sendResponse(response, {
            'json': product,
            'html': html.fromProduct(product),
            [config.app.mediaType.hal]: hal.fromProduct(product)
        }));
});
