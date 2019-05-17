import config from 'config';
import * as http from 'http';

const port = config.get('http.port');

const headers = {
    'X-Application-Version': <string> config.get('application.buildName')
};

export const server = http
    .createServer((req, res) => {
        if (req.url !== '/') {
            res.writeHead(404, headers);
            res.end();
            return;
        }

        res.writeHead(200, {
            ...headers,
            'Content-Type': 'text/plain',
        });
        res.end('Hello, World!');

    })
    .listen(port);

// tslint:disable-next-line: no-console
console.log(`Server running on port ${port}`);
