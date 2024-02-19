import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import BackendServiceError from '../utils/BackendServiceError';

class MainController {
  async errorHandler(err: BackendServiceError, req: Request, res: Response, next: NextFunction) {
    logger.warn('[MainController.errorHandler] Error stack: %o', err.stack);
    let { message } = err;

    try {
      message = JSON.parse(message);
    } catch (e) {
      logger.warn('[MainController.errorHandler] could not parse a message.');
    }

    res.status(err.status || 500).json(message || err.statusText || err);
  }
}

export default new MainController();
