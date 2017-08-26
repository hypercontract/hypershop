const { defaultTo } = require('lodash');
const productStore = require('./store');

module.exports = {
    findProducts,
    getProduct
};

function findProducts(query) {
    return productStore.find(getQueryMatcher(query));
}

function getProduct(id) {
    return productStore.findOne(id);
}

function getQueryMatcher(rawQuery) {
    const query = defaultTo(rawQuery, '').toLowerCase();
    return {
        $where: function () {
            return (
                this.name.toLowerCase().indexOf(query) > -1 ||
                this.description.toLowerCase().indexOf(query) > -1
            );
        }
    };
}
