import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { GetMasterCaseQueryParams } from '../type-definitions';

const ENABLE_MASTER_CASE_VALIDATION = config.get<number>('ENABLE_MASTER_CASE_VALIDATION');

class CaseValidator {
  async getMasterCase(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { caseOwner } = req.query as GetMasterCaseQueryParams;

    if (!ENABLE_MASTER_CASE_VALIDATION || (user.authenticated && user.username === caseOwner)) {
      next();
      return;
    }

    res.status(403).json({ message: 'Usernames do not match, unauthorized access attempt' });
  }
}

export default new CaseValidator();
