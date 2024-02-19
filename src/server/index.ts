import express from 'express';
import * as path from 'path';
import config from 'config';
import { tracingContextMiddleware } from '@a1/gucci-common-tracing/lib/node';
import securityMiddleware from '@a1/gucci-common-bff-security-middleware';
import type { BffSecurityMockUser } from '@a1/gucci-common-bff-security-middleware';
import CoreRoute from './routes/core.route';
import CasesRoute from './routes/cases.route';
import MainController from './controllers/main.controller';
import logger from './logger';

const WAIT_BEFORE_SERVER_CLOSE = process.env.NODE_ENV === 'local-dev' ? 0 : parseInt(process.env.WAIT_BEFORE_SERVER_CLOSE || '10');

const app = express();

const port = config.get<number>('port');
const tracing = config.get<any>('tracing');
const serverPort = process.env.PORT || port;

let mockUser: BffSecurityMockUser | undefined;
if (process.env.NODE_ENV === 'local-dev') {
  // Local test user for BFF security
  mockUser = {
    username: 'mrrobot',
    displayName: 'Mr Robot',
    email: 'mrrobot@aon.at',
    userType: 'SL',
  };
}
app.use(securityMiddleware({
  // allowAsmpAccess: false,
  // enableZeroTrust: false,
  // anonymousAccessPatterns: [],
  mockUser,
}, logger));

app.use(tracingContextMiddleware);

if (process.env.NODE_ENV === 'local-dev') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const devMiddleware = require('./middleware/devMiddleware').default;
  app.use(devMiddleware);
}

if (tracing && tracing.enabled) {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const traceMiddleware = require('@a1/gucci-common-tracing/lib/node').zipkinMiddleware({
    localServiceName: 'microfrontend-user-customer-requests',
    tracerUrl: `${tracing.origin || ''}${tracing.path || ''}`,
  });
  app.use(traceMiddleware);
}

// The latest versions of browser(I got a problem in Chrome 120.0.6099.129) started constantly making
// requests for a favicon.ico, which led to throwing an error in bff. this is the solution:
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Expose package.json and the gucci.json
app.use('/package.json', express.static(path.resolve(__dirname, '..', '..', 'package.json')));
app.use('/gucci.json', express.static(path.resolve(__dirname, '..', '..', 'gucci.json')));

// Expose documentation
app.use('/doc', express.static(path.resolve(__dirname, '..', '..', 'doc')));

app.use(express.static(path.resolve(__dirname, '..', '..', 'dist', 'frontend')));

app.use(CoreRoute);
app.use(CasesRoute);

app.use(MainController.errorHandler);

const server = app.listen(serverPort, () => {
  logger.info(`Widget running at http://localhost:${serverPort}`);
});

// Handle shutdown by K8S
// See https://blog.laputa.io/graceful-shutdown-in-kubernetes-85f1c8d586da
process.on('SIGTERM', () => {
  logger.info(`Received SIGTERM, waiting ${WAIT_BEFORE_SERVER_CLOSE}sec until shutdown`);
  setTimeout(() => {
    server.close(() => {
      logger.info('Server closed, exit');
      process.exit(0);
    });
  }, WAIT_BEFORE_SERVER_CLOSE * 1000);
});
