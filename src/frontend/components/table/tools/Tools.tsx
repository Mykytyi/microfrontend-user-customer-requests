import React, { useState, useEffect } from 'react';
import {
  CollapsableFilter,
  CollapsableFilterWrapper,
  CheckGroup,
  DateInput,
  DatePickerV2,
  GucciDateValue,
} from '@a1/gucci-common-ui-react';
import { conditionOptions, statusOptions } from '../../../constants';

import './Tools.scss';

interface Props {
  setConditionsFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setStatusesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  fromDate: GucciDateValue | null;
  setFromDate: React.Dispatch<React.SetStateAction<GucciDateValue | null>>;
  toDate: GucciDateValue | null;
  setToDate: React.Dispatch<React.SetStateAction<GucciDateValue | null>>;
}

const Tools = ({
  setConditionsFilter,
  setStatusesFilter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: Props) => {
  const [filterByCondition, setFilterByCondition] = useState<string[]>([]);
  const [filterByStatus, setFilterByStatus] = useState<string[]>([]);

  useEffect(() => {
    setConditionsFilter(filterByCondition.map((item) => item.toLowerCase())); // ['Open-Dispatch', 'Postponed'] -> ['open-dispatch', 'postponed']
  }, [filterByCondition]);

  useEffect(() => {
    setStatusesFilter(filterByStatus.map((item) => item.toLowerCase())); // ['in Arbeit A1', 'Mangel Kunde'] -> ['in arbeit a1', 'mangel kunde']
  }, [filterByStatus]);

  return (
    <div className="ToolsContainer">
      <div className="DatesContainer">
        <div className="DateFrom">
          <DateInput
            allowedValues={{
              disableWeekdays: 'weekend',
            }}
            fitting="container"
            inputVariant="standard"
            label="label.from"
            onValueChange={setFromDate}
            size="normal"
            value={fromDate}
          >
            <DatePickerV2 />
          </DateInput>
        </div>
        <div className="DateTo">
          <DateInput
            allowedValues={{
              disableWeekdays: 'weekend',
            }}
            fitting="container"
            inputVariant="standard"
            label="label.to"
            onValueChange={setToDate}
            size="normal"
            value={toDate}
          >
            <DatePickerV2 />
          </DateInput>
        </div>
      </div>
      <div className="FiltersContainer">
        <div className="FilterContainer">
          <CollapsableFilter id="conditionFilter" filterName="filterByCondition" label="filter.condition">
            <CollapsableFilterWrapper filterInfo={(value) => (value as string ? value as string : null)}>
              <CheckGroup
                id="conditions"
                name="conditions"
                columns={1}
                choices={conditionOptions}
                value={filterByCondition}
                onValueChange={setFilterByCondition}
                size="small"
              />
            </CollapsableFilterWrapper>
          </CollapsableFilter>
        </div>
        <div className="FilterContainer">
          <CollapsableFilter id="conditionFilter" filterName="filterByCondition" label="filter.status">
            <CollapsableFilterWrapper filterInfo={(value) => (value as string ? value as string : null)}>
              <CheckGroup
                id="statuses"
                name="statuses"
                columns={1}
                choices={statusOptions}
                value={filterByStatus}
                onValueChange={setFilterByStatus}
                size="small"
              />
            </CollapsableFilterWrapper>
          </CollapsableFilter>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tools);
