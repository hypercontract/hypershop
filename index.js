const express = require('express');
const morgan = require('morgan');
const config = require('config');
var bodyParser = require('body-parser');

const root = require('./root/router');
const endpoints = require('./endpoints');
const mockData = require('./mock/mockData');

mockData.create();

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(root.router);

endpoints.forEach(
    endpoint => app.use(endpoint.basePath, endpoint.router)
);

const port = config.get('http.port');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
