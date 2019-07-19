import * as request from 'supertest';
import Server from 'ts-framework';
import { Logger } from "ts-framework-common";
import { Maintenance } from "../lib";

describe('lib.Server', () => {
  let maintenance;
  Logger.initialize();
  class TestServer extends Server {
    constructor() {
      super({
        port: process.env.PORT as any || 3333,
        router: {
          routes: {
            get: { '/test': (req, res) => res.success({ test: 'ok' }) }
          },
        },
      });
    }

    public onMount() {
      this.app.use(Maintenance.middleware(maintenance));
      return super.onMount();
    }
  }

  it('should block all endpoints with maintenance mode true', async () => {
    // Initialize a simple server
    maintenance = true;
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/test')
      .expect(503);
  });

  it('should block all endpoints with maintenance mode true as a function', async () => {
    // Initialize a simple server
    maintenance = () => true;
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/test')
      .expect(503);
  });

  it('should block all endpoints with maintenance mode true as a promise', async () => {
    // Initialize a simple server
    maintenance = () => Promise.resolve(true);
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/test')
      .expect(503);
  });

  it('should return 200 if promise returns false', async () => {
    // Initialize a simple server
    maintenance = () => Promise.resolve(false);
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/test')
      .expect(200, { test: 'ok' });
  });

  it('should return 200 if function returns false', async () => {
    // Initialize a simple server
    maintenance = () => false;
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/test')
      .expect(200, { test: 'ok' });
  });

  it('should return 200 if value is false', async () => {
    // Initialize a simple server
    maintenance = false;
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/test')
      .expect(200, { test: 'ok' });
  });
});