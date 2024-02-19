import { useQuery } from '@tanstack/react-query';
import { CaseApi } from '../api/case';

import { Case } from '../../server/type-definitions';

export const useGetCases = (caseOwner: string | null | undefined) => useQuery<Array<Partial<Case>>>({
  queryKey: ['cases'],
  queryFn: () => CaseApi.getMasterCase({ caseOwner }),
  retry: false,
});
