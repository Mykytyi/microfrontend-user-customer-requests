import express, { Request, Response, NextFunction } from 'express';
import config from 'config';
import logger from '../logger';
import { apiServiceBff } from '../apiServiceBff/apiServiceBff';

let tainted = false;

const CASE_MASTER_SERVICE_URL = config.get<number>('CASE_MASTER_SERVICE_URL');

const router = express();

// Kubernetes' readiness probe
router.route('/ready').get(async (req: Request, res: Response, next: NextFunction) => {
  const url = `${CASE_MASTER_SERVICE_URL}/health`;

  await apiServiceBff
    .get(url, { responseType: 'originResponse' })
    .then((response) => {
      logger.info('[Router.ready] Readiness probe was successful: %o', response.statusText || response);
      res.sendStatus(200);
    })
    .catch((e) => {
      logger.error('[Router.ready] Readiness probe failed: %o', e);
      next(e);
    });
});

// Kubernetes liveliness probe
router.route('/live').get(async (req: Request, res: Response) => {
  if (tainted) {
    res.sendStatus(500);
  } else {
    res.end();
  }
});

process.on('uncaughtException', (err) => {
  logger.error('FATAL: Uncaught Exception: %s %s', err.message, err.stack);
  // An uncaught exception indicates a severe programming mistake;
  // The service might not work as expected anymore, so, flag it as tainted and request a restart
  tainted = true;
});

export default router;
