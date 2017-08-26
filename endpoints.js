const products = require('./products/router');
const shoppingCart = require('./shoppingCart/router');
const userProfile = require('./userProfile/router');
const orders = require('./orders/router');

module.exports = [
    products,
    shoppingCart,
    userProfile,
    orders
];