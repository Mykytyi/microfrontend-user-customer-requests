import { Router } from 'express';
import controller from '../controllers/case.controller';
import validator from '../validators/case.validator';

const router = Router();

router.get('/api/casemaster/search', validator.getMasterCase, controller.getMasterCase);

export default router;
