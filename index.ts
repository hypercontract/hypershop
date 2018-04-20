import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as config from 'config';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import { isUndefined, get } from 'lodash';

import * as root from './root/router';
import { getRootUri } from './root/uris';
import { endpoints } from './endpoints';
import * as mockData from './mock/mockData';

mockData.create();

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.locals = {
    rootLink: getRootUri()
};

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/hal+json' }));
app.use(bodyParser.json({ type: 'application/ld+json' }));

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
