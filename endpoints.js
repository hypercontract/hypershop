const profile = require('./profile/router');
const products = require('./products/router');
const shoppingCart = require('./shoppingCart/router');
const userProfile = require('./userProfile/router');
const orders = require('./orders/router');

module.exports = [
    profile,
    products,
    shoppingCart,
    userProfile,
    orders
];