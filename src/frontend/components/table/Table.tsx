import React, { useEffect, useState, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  List,
  ListHeader,
  ListBody,
  ListHeaderCell,
  ListRowFeature,
  ButtonV2,
  ListItem,
  GucciDateValue,
} from '@a1/gucci-common-ui-react';
import { useSelector } from 'react-redux';
import {
  CustomCell,
  TitleCell,
  TypeCell,
  DetailCell,
  DueDateCell,
  UpdatedDateCell,
  ConditionCell,
  StatusCell,
  SlaCell,
} from './cells/Cells';
import { RootState } from '../../redux/store';
import { useGetCases } from '../../queries';
import Tools from './tools/Tools';
import { elementsOnPage } from '../../constants';

import { Case } from '../../../server/type-definitions';

import './Table.scss';

export interface CaseExtended extends Partial<Case> {
  id: string,
  [key: string]: unknown,
}

const Table = () => {
  const caseOwner = useSelector((state: RootState) => state.config.caseOwner);
  const [shownCases, setShownCases] = useState(elementsOnPage);
  const [isDownloadMore, setIsDownloadMore] = useState(false);
  const [conditionsFilter, setConditionsFilter] = useState<string[]>([]);
  const [statusesFilter, setStatusesFilter] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<GucciDateValue | null>('');
  const [toDate, setToDate] = useState<GucciDateValue | null>('');

  const {
    data,
    isPending,
    isSuccess,
  } = useGetCases(caseOwner);

  useEffect(() => {
    // every time filters are changed we reset the amount of shown cases
    setShownCases(elementsOnPage);
  }, [conditionsFilter, statusesFilter, fromDate, toDate]);

  const parsedCases: ListItem<CaseExtended>[] = useMemo(() => {
    if (!data) {
      return [];
    }
    return data
      .filter((item) => {
        const noFilters = !fromDate && !toDate && !conditionsFilter.length && !statusesFilter.length;
        if (noFilters) {
          return true;
        }

        // filtering by Date logic
        if (fromDate && item.updateDate) {
          if (new Date(fromDate) > new Date(item.updateDate)) return false;
        }
        if (toDate && item.updateDate) {
          if (new Date(toDate) < new Date(item.updateDate)) return false;
        }
        // filtering by conditions logic
        if (conditionsFilter.length && item.caseCondition) {
          if (!conditionsFilter.includes(item?.caseCondition?.toLowerCase())) return false;
        }
        // filtering by statuses logic
        if (statusesFilter.length && item.caseStatus) {
          if (!statusesFilter.includes(item?.caseStatus?.toLowerCase())) return false;
        }

        return true;
      })
      // inserting an id in every item as it is the only one requirement for the ListBody items
      .map((item) => ({
        data: {
          id: nanoid(),
          ...item,
        },
      }));
  }, [data, shownCases, conditionsFilter, statusesFilter, fromDate, toDate]);

  const paginatedCases = useMemo(() => {
    return parsedCases.slice(0, shownCases);
  }, [parsedCases, shownCases]);

  useEffect(() => {
    // "Load more" button handler
    if (isSuccess && data.length && parsedCases.length > shownCases) {
      setIsDownloadMore(true);
    } else {
      setIsDownloadMore(false);
    }
  }, [data, shownCases, parsedCases]);

  return (
    <div className="Table" data-testid="table-mode">
      <div className="TableToolsContainer">
        <Tools
          setConditionsFilter={setConditionsFilter}
          setStatusesFilter={setStatusesFilter}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
      </div>
      <div className="TableContainer">
        <div className="Table">
          <List id="cases-list">
            <ListHeader>
              <ListHeaderCell<CaseExtended> field="partyId" label="table.label.number" />
              <ListHeaderCell<CaseExtended> field="caseId" label="table.label.caseId" />
              <ListHeaderCell<CaseExtended> field="title" label="table.label.title" />
              <ListHeaderCell<CaseExtended> field="masterCaseType" label="table.label.type" />
              <ListHeaderCell<CaseExtended> field="crmSystem" label="table.label.detail" />
              <ListHeaderCell<CaseExtended> field="dueDate" label="table.label.dueDate" />
              <ListHeaderCell<CaseExtended> field="updateDate" label="table.label.acceptedOn" />
              <ListHeaderCell<CaseExtended> field="caseCondition" label="table.label.condition" />
              <ListHeaderCell<CaseExtended> field="caseStatus" label="table.label.status" />
              <ListHeaderCell<CaseExtended> field="sla" label="table.label.sla" />
            </ListHeader>
            <ListBody
              items={paginatedCases}
              showLoading={isPending}
              showEmptyInfo
            >
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="partyId">
                <CustomCell bold field="partyId" />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="caseId">
                <CustomCell bold field="caseId" />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="title">
                <TitleCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="masterCaseType">
                <TypeCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="crmSystem">
                <DetailCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="dueDate">
                <DueDateCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="updateDate">
                <UpdatedDateCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="caseCondition">
                <ConditionCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="caseStatus">
                <StatusCell />
              </ListRowFeature>
              <ListRowFeature<CaseExtended> feature="cell-renderer" field="sla">
                <SlaCell />
              </ListRowFeature>
            </ListBody>
          </List>
        </div>

        {isSuccess && data.length > 5 && (
          <div className="ButtonsContainer">
            <ButtonV2
              label="button.loadMore"
              disabled={!isDownloadMore}
              buttonStyle="flat"
              onClick={() => setShownCases((prevState) => prevState + 5)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Table);
