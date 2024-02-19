import { MasterCaseColor } from '../type-definitions';
import { MasterCaseTypes, Systems, CaseConditions } from '../../server/type-definitions';

export const caseTypeColors: Record<Lowercase<MasterCaseTypes | 'default'>, MasterCaseColor> = {
  manual_case: {
    category: 5,
    categoryItem: 2,
  },
  grouping_case: {
    category: 'wde',
  },
  default: {
    category: 7,
    categoryItem: 2,
  },
};

export const detailColors: Record<Lowercase<Systems | 'default'>, MasterCaseColor> = {
  case_master: {
    category: 'mastercase',
  },
  crm_fixed: {
    category: 'crm_fixed',
  },
  crm_mobile: {
    category: 'mobile',
  },
  default: {
    category: 'mobile',
  },
};

export const conditionColors: Record<Lowercase<CaseConditions | 'default'>, MasterCaseColor> = {
  open: {
    condition: 'open',
  },
  dispatched: {
    condition: 'dispatched',
  },
  'open-dispatch': {
    condition: 'open_dispatch',
  },
  accepted: {
    condition: 'accepted',
  },
  postponed: {
    condition: 'on_hold',
  },
  pre_closing: {
    condition: 'closed_admin_pending',
  },
  closed: {
    condition: 'closed',
  },
  automatic_processing: {
    condition: 'reopened',
  },
  default: {
    condition: 'reopened',
  },
};

export const statusColors: Record<string, MasterCaseColor> = {
  inArbeit: {
    category: 6,
    categoryItem: 3,
  },
  nochNichtUbergeben: {
    category: 6,
    categoryItem: 2,
  },
  default: {
    category: 7,
    categoryItem: 1,
  },
};
