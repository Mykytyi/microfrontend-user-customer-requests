import React from 'react';
import { Chip } from '@a1/gucci-common-ui-react';
import { MasterCaseColor } from '../../../../type-definitions';
import {
  detailColorParser,
  conditionColorParser,
  statusColorParser,
} from '../../../../utils/colorParsers';

export const ConditionChip = React.memo(({ condition }: { condition?: string, }) => {
  if (!condition) return null;
  const color: Partial<MasterCaseColor> = conditionColorParser(condition);

  return (
    <Chip
      label={condition}
      size="normal"
      variant="condition"
      condition={color.condition}
    />
  );
});

export const StatusChip = React.memo(({ status }: { status?: string, }) => {
  if (!status) return null;
  const color: Partial<MasterCaseColor> = statusColorParser(status);

  return (
    <Chip
      label={status}
      size="normal"
      variant="category"
      category={color.category}
      categoryItem={color.categoryItem}
    />
  );
});

export const SystemChip = React.memo(({ system }: { system?: string, }) => {
  if (!system) return null;
  const color: Partial<MasterCaseColor> = detailColorParser(system);

  return (
    <Chip
      label={system}
      size="normal"
      variant="category"
      category={color.category}
      categoryItem={color.categoryItem}
    />
  );
});
