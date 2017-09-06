const config = require('config');

module.exports = {
    shop: (name) => config.app.namespace + name,
    cfha: (name) => 'http://cfha.luchs.org/#' + name,
    owl: (name) => `http://www.w3.org/2002/07/owl#${name}`,
    rdfs: (name) => `http://www.w3.org/2000/01/rdf-schema#${name}`
};