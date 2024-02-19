// core
export const READINESS_PROBE = 'ReadinessProbe';

// Tracing

export const TRACING_CASE_CONTROLLER_UPDATE_CASE_STATUS = 'CaseController.updateCaseStatus';
export const TRACING_CASE_CONTROLLER_GET_MASTER_CASE = 'CaseController.getMasterCase';
export const TRACING_CASE_VALIDATOR_UPDATE_CASE_STATUS = 'CaseValidator.updateCaseStatus';
export const TRACING_CASE_VALIDATOR_GET_MASTER_CASE = 'CaseValidator.getMasterCase';
export const TRACING_CASE_SERVICE_UPDATE_CASE_STATUS = 'CaseService.updateCaseStatus';
export const TRACING_CASE_SERVICE_GET_MASTER_CASE = 'CaseService.getMasterCase';

export type ITracing = typeof TRACING_CASE_CONTROLLER_UPDATE_CASE_STATUS
  | typeof TRACING_CASE_CONTROLLER_GET_MASTER_CASE
  | typeof TRACING_CASE_VALIDATOR_UPDATE_CASE_STATUS
  | typeof TRACING_CASE_VALIDATOR_GET_MASTER_CASE
  | typeof TRACING_CASE_SERVICE_UPDATE_CASE_STATUS
  | typeof TRACING_CASE_SERVICE_GET_MASTER_CASE

// error text contains strings
export const NETWORK_TIMEOUT_TEXT = 'network timeout';
export const SOCKET_TIMEOUT_TEXT = 'ESOCKETTIMEDOUT';
export const CONNECTION_REFUSED_TEXT = 'ECONNREFUSED';
export const NOT_FOUND_TEXT = 'Not Found';
export const CODE_404_TEXT = '404';

export const SERVICE_URL = 'ServiceUrl';

// general errors postfix
export const UNHANDLED_ERROR = 'UnhandledError';
export const TIMEOUT_ERROR = 'Timeout';
export const UNAVAILABLE_ERROR = 'Unavailable';

export const HTTP_ERROR_PREFIX = 'http_error.';

// enums
export enum SlaStatus {
  SLA_IN_CALCULATION = 'SLA_IN_CALCULATION',
  SLA_PROCESSED = 'SLA_PROCESSED',
  SLA_PROCESSED_NO_SLA = 'SLA_PROCESSED_NO_SLA',
  SLA_ERROR = 'SLA_ERROR'
}

export enum MasterCaseConditions {
  OPEN = 'OPEN',
  DISPATCHED = 'DISPATCHED',
  ACCEPTED = 'ACCEPTED',
  POSTPONED = 'POSTPONED',
  PRE_CLOSING = 'PRE_CLOSING',
  CLOSED = 'CLOSED',
  AUTOMATIC_PROCESSING = 'AUTOMATIC_PROCESSING'
}

export enum MasterCaseStatuses {
  'in Arbeit A1' = 'in Arbeit A1',
  '(_) Noch nicht überg' = '(_) Noch nicht überg',
  'Default' = 'Default',
}

export enum MasterCaseType {
  GROUPING_CASE = 'GROUPING_CASE',
  MANUAL_CASE = 'MANUAL_CASE',
  AUTOMATIC_PROCESSING = 'AUTOMATIC_PROCESSING'
}

export enum SourceSystemBff {
  CRM_FIXED = 'CRM_FIXED',
  CRM_MOBILE = 'CRM_MOBILE',
  CASE_MASTER = 'CASE_MASTER'
}
