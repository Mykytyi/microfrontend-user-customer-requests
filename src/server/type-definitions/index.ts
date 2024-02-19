export interface IQueryParams {
  [key: string]: string | number | boolean;
}

export interface GetMasterCaseQueryParams {
  [key: string]: string | number | boolean;
}

export interface Case {
  masterCaseId: string, // '763082',
  caseId: string, // '61923957',
  crmSystem: Systems,
  partyId: string,
  caseCondition: Capitalize<CaseConditions> | Uppercase<CaseConditions>, // 'Open',
  masterCaseType: MasterCaseTypes,
  caseStatus: string, // '(_) Noch nicht überg',
  typeLevel1: string, // 'CCA',
  typeLevel2: string, // 'Allgemeiner GF',
  typeLevel3: string, // 'ADSL/Kombi/Flash',
  typeLevel4: string, // 'ADSL/Kombi/Flash',
  caseOwner: string, // 'q392480',
  createdDate: string, // '2022-09-28T13:30:22'
  dueDate: string, // '2022-09-29T13:30:22'
  updateDate: string,
  slaDate: string,
}

export type CaseConditions = 'open' | 'dispatched' | 'Open-Dispatch' | 'accepted' | 'postponed' | 'pre_closing' | 'closed' | 'automatic_processing';

export type Systems = 'CRM_FIXED' | 'CRM_MOBILE' | 'CASE_MASTER';

export type MasterCaseTypes = 'GROUPING_CASE' | 'MANUAL_CASE';
