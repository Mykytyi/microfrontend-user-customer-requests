import { SortBy } from '../type-definitions';
import { Case } from '../../server/type-definitions';

const sortByDiscarded = ['postponed', 'Postponed', 'POSTPONED', 'Open-Dispatch', 'open-dispatch', 'OPEN-DISPATCH'];
const sortByAccepted = ['open', 'Open', 'OPEN', 'accepted', 'Accepted', 'ACCEPTED'];

export const casesParser = (data: Array<Partial<Case>>, sortBy: SortBy, paginationSize: number) => {
  let sortedData = data;

  if (sortBy === 'Accepted') {
    sortedData = data.filter((item) => item.caseCondition && sortByAccepted.includes(item.caseCondition));
  } else if (sortBy === 'Discarded') {
    sortedData = data.filter((item) => item.caseCondition && sortByDiscarded.includes(item.caseCondition));
  }

  const result = [];
  for (let i = 0; i < sortedData.length; i += paginationSize) {
    const chunk = sortedData.slice(i, i + paginationSize);
    result.push(chunk);
  }
  return result;
};
