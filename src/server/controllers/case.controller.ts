import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import CaseService from '../services/case.service';
import {
  TRACING_CASE_CONTROLLER_GET_MASTER_CASE,
} from '../constants';

class CaseController {
  async getMasterCase(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(`[${TRACING_CASE_CONTROLLER_GET_MASTER_CASE}] START.`);

      const result = await CaseService.getMasterCase(req, res);

      logger.info(`[${TRACING_CASE_CONTROLLER_GET_MASTER_CASE}] Case master data: %o`, result);

      return res.json(result);
    } catch (e) {
      return next(e);
    }
  }
}

export default new CaseController();
