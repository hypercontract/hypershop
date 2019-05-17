import request from 'supertest';
import { server } from '.';

describe('server', () => {
    const expectedApplicationVersion = 'test';

    describe('GET /', () => {
        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .expect('X-Application-Version', expectedApplicationVersion)
                .expect(200, 'Hello, World!');
        });
    });

    describe('GET /invalid', () => {
        it('should return 404 Not Found', () => {
            return request(server)
                .get('/invalid')
                .expect('X-Application-Version', expectedApplicationVersion)
                .expect(404);
        });
    });
});
