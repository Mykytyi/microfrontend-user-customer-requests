import {
  GucciCommonChipCategory,
  GucciCommonChipCondition,
  GucciCommonMainColor,
} from '@a1/gucci-common-ui-react/lib/v2/core/types/common';
import { Case } from '../../server/type-definitions';

export interface IQueryParams {
  [key: string]: string | number | boolean;
}

export type State = {
  config: WidgetConfig;
};

export type WidgetConfig = {
  caseOwner: string | undefined | null;
  view: 'SUMMARY' | 'TABLE' | undefined | null;
  appId: string;
};

export type ParsedCases = Array<Array<Partial<Case>>>;

export type SortBy = 'All' | 'Discarded' | 'Accepted';

export type ChipsArray = Array<{ data: string | undefined, color: GucciCommonMainColor }>;

export interface MasterCaseColor {
  condition?: GucciCommonChipCondition,
  category?: GucciCommonChipCategory | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined,
  categoryItem?: 1 | 2 | 3 | undefined,
}
