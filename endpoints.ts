import * as profile from './profile/router';
import * as products from './products/router';
import * as shoppingCart from './shoppingCart/router';
import * as userProfile from './userProfile/router';
import * as orders from './orders/router';
import { RequestHandler } from 'express';

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