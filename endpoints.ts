import { RequestHandler } from 'express';
import * as orders from './orders/router';
import * as products from './products/router';
import * as profile from './profile/router';
import * as shoppingCart from './shoppingCart/router';
import * as userProfile from './userProfile/router';

export interface Endpoint {
    basePath: string;
    router: RequestHandler;
}

export const endpoints: Endpoint[] = [
    profile,
    products,
    shoppingCart,
    userProfile,
    orders
];
