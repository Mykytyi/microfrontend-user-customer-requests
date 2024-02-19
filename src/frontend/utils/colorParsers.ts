import { MasterCaseColor } from '../type-definitions';
import {
  caseTypeColors,
  conditionColors,
  detailColors,
  statusColors,
} from './constants';

export const typeColorParser = (condition: string): Partial<MasterCaseColor> => {
  let color: Partial<MasterCaseColor>;

  switch (condition.toLowerCase()) {
    case ('manual_case'):
      color = caseTypeColors.manual_case;
      break;
    case ('grouping_case'):
      color = caseTypeColors.grouping_case;
      break;
    default:
      color = caseTypeColors.default;
      break;
  }

  return color;
};

export const detailColorParser = (condition: string): Partial<MasterCaseColor> => {
  let color: Partial<MasterCaseColor>;

  switch (condition.toLowerCase()) {
    case ('crm_fixed'):
      color = detailColors.crm_fixed;
      break;
    case ('crm_mobile'):
      color = detailColors.crm_mobile;
      break;
    case ('case_master'):
      color = detailColors.case_master;
      break;
    default:
      color = detailColors.default;
      break;
  }

  return color;
};

export const conditionColorParser = (condition: string): Partial<MasterCaseColor> => {
  let color: Partial<MasterCaseColor>;

  switch (condition.toLowerCase()) {
    case ('open'):
      color = conditionColors.open;
      break;
    case ('dispatched'):
      color = conditionColors.dispatched;
      break;
    case ('open-dispatch'):
      color = conditionColors['open-dispatch'];
      break;
    case ('accepted'):
      color = conditionColors.accepted;
      break;
    case ('postponed'):
      color = conditionColors.postponed;
      break;
    case ('pre_closing'):
      color = conditionColors.pre_closing;
      break;
    case ('closed'):
      color = conditionColors.closed;
      break;
    case ('automatic_processing'):
      color = conditionColors.automatic_processing;
      break;
    default:
      color = conditionColors.default;
      break;
  }

  return color;
};

export const statusColorParser = (condition: string): Partial<MasterCaseColor> => {
  let color: Partial<MasterCaseColor>;

  if (condition.toLowerCase().includes('noch nicht überg')) {
    color = statusColors.nochNichtUbergeben;
  } else if (condition.toLowerCase().includes('in arbeit a1')) {
    color = statusColors.inArbeit;
  } else {
    color = statusColors.default;
  }

  return color;
};
