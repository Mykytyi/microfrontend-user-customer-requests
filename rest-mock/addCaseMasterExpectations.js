const addRestExpectations = require('./tools/addRestExpectations');
const { CASE_MASTER_SERVICE } = require('./constants');

async function addCaseMasterExpectations() {
  await addRestExpectations([
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q222'],
      },
      statusCode: 200,
      delayMs: 2000,
      responseFile: 'caseMaster/GET_200_mastercase_22_cases.json',
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q217'],
      },
      statusCode: 200,
      delayMs: 2000,
      responseFile: 'caseMaster/GET_200_mastercase_17_cases.json',
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q210'],
      },
      statusCode: 200,
      delayMs: 2000,
      responseFile: 'caseMaster/GET_200_mastercase_10_cases.json',
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q206'],
      },
      statusCode: 200,
      delayMs: 2000,
      responseFile: 'caseMaster/GET_200_mastercase_6_cases.json',
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q203'],
      },
      statusCode: 200,
      delayMs: 3000,
      responseFile: 'caseMaster/GET_200_mastercase_3_cases.json',
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q200'],
      },
      statusCode: 200,
      delayMs: 3000,
      responseFile: 'caseMaster/GET_200_mastercase_0_cases.json',
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q500'],
      },
      statusCode: 200,
      delayMs: 2000,
    },
    {
      method: 'GET',
      path: `${CASE_MASTER_SERVICE}/casemaster/search`,
      queryStringParameters: {
        caseOwner: ['Q400'],
      },
      statusCode: 400,
      responseFile: 'caseMaster/GET_400_mastercase.json',
      delayMs: 2500,
    },
  ]);
  console.info('Case Master rest data loaded');
}

module.exports = addCaseMasterExpectations;
