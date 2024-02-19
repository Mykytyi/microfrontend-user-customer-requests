import { NextFunction, Request, Response } from 'express';
import config from 'config';
import logger from '../logger';
import { apiServiceBff } from '../apiServiceBff/apiServiceBff';
import {
  Case,
  GetMasterCaseQueryParams,
} from '../type-definitions';
import {
  TRACING_CASE_SERVICE_GET_MASTER_CASE,
} from '../constants';

const CASE_MASTER_SERVICE_URL = config.get<number>('CASE_MASTER_SERVICE_URL');

class CaseService {
  async getMasterCase(req: Request, res: Response) {
    const { caseOwner } = req.query as GetMasterCaseQueryParams;

    const url = `${CASE_MASTER_SERVICE_URL}/casemaster/search${apiServiceBff.queryParamsStringify({ caseOwner })}`;

    logger.info(`[${TRACING_CASE_SERVICE_GET_MASTER_CASE}] URL: %s`, url);

    const result: Array<Partial<Case>> = await apiServiceBff
      .get(url)
      .catch((e) => {
        logger.error(`[${TRACING_CASE_SERVICE_GET_MASTER_CASE}] Error while getting a master case: %o; error.message: %s`, e, e.message);
        throw e;
      });

    return result;
  }
}

export default new CaseService();
