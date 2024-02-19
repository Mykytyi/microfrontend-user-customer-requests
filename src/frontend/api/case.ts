import { apiService } from './apiService';

export class CaseApi {
  static getMasterCase = (data: any) => apiService.get(
    `/casemaster/search${apiService.queryParamsStringify(data)}`,
  );
}
