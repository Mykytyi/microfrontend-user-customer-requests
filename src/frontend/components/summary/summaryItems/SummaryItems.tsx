import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import SummaryItem from '../summaryItem/SummaryItem';
import { Case } from '../../../../server/type-definitions';

interface Props {
  cases: Array<Partial<Case>> | undefined;
}

const SummaryItems = ({ cases }: Props) => {
  if (!cases?.length) {
    return (
      <SummaryItem noCases />
    );
  }

  return (
    <>
      {(cases).map((item) => <SummaryItem data={item} key={nanoid()} />)}
    </>
  );
};

export default React.memo(SummaryItems);
