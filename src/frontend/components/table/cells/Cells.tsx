import React from 'react';
import {
  Chip,
  ListItem,
  CountDownChip,
} from '@a1/gucci-common-ui-react';
import dayjs from 'dayjs';
import {
  typeColorParser,
  detailColorParser,
  conditionColorParser,
  statusColorParser,
} from '../../../utils/colorParsers';
import { CaseExtended } from '../Table';

import { MasterCaseColor } from '../../../type-definitions';

export interface ICustomCell {
  field: string,
  item?: ListItem<CaseExtended>,
  bold?: boolean,
}

export const CustomCell = ({ field, item, bold }: ICustomCell) => {
  if (!item || !item.data[field]) return <p>-</p>;
  return <p style={{ fontWeight: bold ? 'bold' : 'normal' }}>{(item.data[field] as React.ReactNode)}</p>;
};

export const TitleCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item) return <p>-</p>;
  const typeArray = [item.data.typeLevel1, item.data.typeLevel2, item.data.typeLevel3, item.data.typeLevel4];
  return <p>{(typeArray.filter((item) => item !== undefined || item).join(' / '))}</p>;
};

export const TypeCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.masterCaseType) return <p>-</p>;
  const color: Partial<MasterCaseColor> = typeColorParser(item.data.masterCaseType);

  return (
    <Chip
      label={(item.data.masterCaseType as string)}
      size="normal"
      variant="category"
      category={color.category}
      categoryItem={color.categoryItem}
    />
  );
};

export const DetailCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.crmSystem) return <p>-</p>;
  const color: Partial<MasterCaseColor> = detailColorParser(item.data.crmSystem);

  return (
    <Chip
      label={(item.data.crmSystem as string)}
      size="normal"
      variant="category"
      category={color.category}
      categoryItem={color.categoryItem}
    />
  );
};

export const DueDateCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.dueDate) return <p>-</p>;
  const date = (item.data.dueDate as unknown as Date);
  return (
    <p>
      {dayjs(date).format('DD.MM.YYYY HH:mm')}
    </p>
  );
};

export const UpdatedDateCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.updateDate) return <p>-</p>;
  const date = (item.data.updateDate as unknown as Date);
  return (
    <p>
      {dayjs(date).format('DD.MM.YYYY HH:mm')}
    </p>
  );
};

export const ConditionCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.caseCondition) return <p>-</p>;
  const color: Partial<MasterCaseColor> = conditionColorParser(item.data.caseCondition);

  return (
    <Chip
      label={(item.data.caseCondition as string)}
      size="normal"
      variant="condition"
      condition={color.condition}
    />
  );
};
export const StatusCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.caseStatus) return <p>-</p>;
  const color = statusColorParser(item?.data.caseStatus);
  return (
    <Chip
      label={(item.data.caseStatus as string)}
      size="normal"
      variant="category"
      category={color.category}
      categoryItem={color.categoryItem}
    />
  );
};

export const SlaCell = ({ item }: { item?: ListItem<CaseExtended>, }) => {
  if (!item?.data.slaDate) return <p>-</p>;
  const date = (item.data.slaDate as unknown as Date);

  return (
    <CountDownChip size="normal" enableDateHint format="day-hour-minute" target={new Date(date)} />
  );
};
