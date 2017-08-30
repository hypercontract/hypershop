const express = require('express');
const morgan = require('morgan');
const config = require('config');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { isUndefined, get } = require('lodash');

const root = require('./root/router');
const { getRootUri } = require('./root/uris');
const endpoints = require('./endpoints');
const mockData = require('./mock/mockData');

mockData.create();

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.locals = {
    rootLink: getRootUri()
};

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/hal+json'
}));

app.use(methodOverride(request => {
    const method = get(request, 'body._method');
    if (!isUndefined(method)) {
        delete request.body._method;
    }
    return method;
}));

app.use(root.router);

endpoints.forEach(
    endpoint => app.use(endpoint.basePath, endpoint.router)
);

const port = config.get('http.port');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
