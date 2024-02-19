import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  ButtonV2,
  LoadingContentPlaceholderBlock,
  PageNavigator,
} from '@a1/gucci-common-ui-react';
import { useGetCases } from '../../queries';
import { casesParser } from '../../utils/casesParser';
import SummaryItems from './summaryItems/SummaryItems';
import { RootState } from '../../redux/store';
import { ParsedCases, SortBy } from '../../type-definitions';

import './Summary.scss';

const Summary = () => {
  const caseOwner = useSelector((state: RootState) => state.config.caseOwner);
  const [sortBy, setSortBy] = useState<SortBy>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [parsedCases, setParsedCases] = useState<ParsedCases>([]);
  const [isPagination, setIsPagination] = useState(false);

  const {
    data,
    isPending,
    isSuccess,
  } = useGetCases(caseOwner);

  useEffect(() => {
    if (data && data.length > 5) {
      setIsPagination(true);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess && data) {
      setParsedCases(casesParser(data, sortBy, 5));
    }
  }, [data, sortBy, isSuccess]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  if (isPending) {
    return (
      <div className="Summary" data-testid="summary-mode">
        <div className="Placeholder" data-testid="cases-loading-placeholders">
          <div className="ButtonsContainer">
            <LoadingContentPlaceholderBlock height="42px" width="60px" key={nanoid()} />
            <LoadingContentPlaceholderBlock height="42px" width="96px" key={nanoid()} />
            <LoadingContentPlaceholderBlock height="42px" width="84px" key={nanoid()} />
          </div>
          <div className="CasesContainer">
            <LoadingContentPlaceholderBlock height="84px" key={nanoid()} />
            <LoadingContentPlaceholderBlock height="84px" key={nanoid()} />
            <LoadingContentPlaceholderBlock height="84px" key={nanoid()} />
            <LoadingContentPlaceholderBlock height="84px" key={nanoid()} />
            <LoadingContentPlaceholderBlock height="84px" key={nanoid()} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Summary" data-testid="summary-mode">
      <div className="ButtonsContainer">
        <ButtonV2
          label="button.all"
          onClick={() => setSortBy('All')}
          buttonStyle={sortBy === 'All' ? 'primary' : 'secondary'}
          key={nanoid()}
        />
        <ButtonV2
          label="button.discarded"
          onClick={() => setSortBy('Discarded')}
          buttonStyle={sortBy === 'Discarded' ? 'primary' : 'secondary'}
          key={nanoid()}
        />
        <ButtonV2
          label="button.accepted"
          onClick={() => setSortBy('Accepted')}
          buttonStyle={sortBy === 'Accepted' ? 'primary' : 'secondary'}
          key={nanoid()}
        />
      </div>
      <div className="CasesContainer">
        <SummaryItems cases={parsedCases[currentPage - 1]} />
        {isPagination && (
          <div data-testid="summary-mode-navigatior">
            <PageNavigator
              pageCount={parsedCases.length}
              pageNumber={currentPage}
              handleChangePage={setCurrentPage}
              spacing="condensed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Summary);
