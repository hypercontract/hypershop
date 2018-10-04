import * as express from 'express';
import { getProductUri } from '../products/uris';
import { acceptIsHtml, contentTypeIsJsonHal, contentTypeIsJsonLd, jsonHalWithProfile, jsonLdWithProfile } from '../shared/mediaType';
import { sendResponse } from '../shared/response';
import * as userProfileService from '../userProfile/service';
import * as hal from './hal';
import * as html from './html';
import * as ld from './ld';
import * as shoppingCartService from './service';
import { getBasePath, getRootPath, getRootUri, getShoppingCartItemPath, getShoppingCartItemsPath } from './uris';

export const basePath = getBasePath();

export const router = express.Router();

router.get(getRootPath(), (request, response) => {
    Promise.all([
        shoppingCartService.getShoppingCart(),
        userProfileService.getUserProfile()
    ])
        .then(([shoppingCart, userProfile]) => sendResponse(response, {
            json: shoppingCart,
            html: html.fromShoppingCart(shoppingCart, userProfile),
            [jsonHalWithProfile]: hal.fromShoppingCart(shoppingCart),
            [jsonLdWithProfile]: ld.fromShoppingCart(shoppingCart)
        }));
});

router.post(getShoppingCartItemsPath(), (request, response) => {
    let productId;
    // TODO: use mime type matcher
    if (contentTypeIsJsonHal(request) || contentTypeIsJsonLd(request)) {
        productId = request.body.product.replace(new RegExp(getProductUri('(.*)')), '$1');
    } else {
        productId = request.body.product;
    }

    let statusCode = 201;
    // TODO: use mime type matcher
    if (acceptIsHtml(request)) {
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
