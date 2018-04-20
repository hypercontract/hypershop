import * as express from 'express';
import * as config from 'config';
import { escapeRegExp } from 'lodash';
import * as hal from './hal';
import * as html from './html';
import * as shoppingCartService from './service';
import * as userProfileService from '../userProfile/service';
import { getBasePath, getRootPath, getRootUri, getShoppingCartItemsPath, getShoppingCartItemPath } from './uris';
import { getProductUri } from '../products/uris';
import { sendResponse } from '../shared/util';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    Promise.all([
        shoppingCartService.getShoppingCart(),
        userProfileService.getUserProfile()
    ])
        .then(([shoppingCart, userProfile]) => sendResponse(response, {
            'json': shoppingCart,
            'html': html.fromShoppingCart(shoppingCart, userProfile),
            [config.app.mediaType.hal]: hal.fromShoppingCart(shoppingCart)
        }));
});

router.post(getShoppingCartItemsPath(), (request, response) => {
    let productId;
    // TODO: use mime type matcher
    if (request.get('Content-Type') === config.app.mediaType.hal) {
        productId = request.body.product.replace(new RegExp(getProductUri('(.*)')), '$1');
    } else {
        productId = request.body.product;
    }
    
    let statusCode = 201;
    // TODO: use mime type matcher
    if (request.get('Accept')!.match(escapeRegExp('text/html'))) {
        statusCode = 303;
    }

    shoppingCartService.addShoppingCartItem(
        productId,
        request.body.quantity
    )
        .then(() => response.redirect(statusCode, getRootUri()));
});

router.patch(getShoppingCartItemPath(), (request, response) => {
    shoppingCartService.updateShoppingCartItemQuantity(
        request.params.shoppingCartItemId,
        request.body.quantity
    )
        .then(() => response.redirect(303, getRootUri()));
});

router.delete(getShoppingCartItemPath(), (request, response) => {
    shoppingCartService.deleteShoppingCartItem(
        request.params.shoppingCartItemId
    )
        .then(() => response.redirect(303, getRootUri()));
});
