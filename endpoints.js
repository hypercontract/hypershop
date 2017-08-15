const catalog = require('./catalog/router');
const shoppingCart = require('./shoppingCart/router');
const userProfile = require('./userProfile/router');
const orders = require('./orders/router');

module.exports = [
    catalog,
    shoppingCart,
    userProfile,
    orders
];