import nock from 'nock';
import { Case } from '../../../../../src/server/type-definitions';
import threeCase from '../../../../../rest-mock/data/caseMaster/GET_200_mastercase_3_cases.json';
import sixCase from '../../../../../rest-mock/data/caseMaster/GET_200_mastercase_6_cases.json';

/**
 * A function that creates an HTTP server mock with nock
 */
const setupNockTestData = (caseOwner: string, casesAmount: number) => {
  let cases: Array<Partial<Case>> = (threeCase as Array<Partial<Case>>);
  if (casesAmount === 6) {
    cases = (sixCase as Array<Partial<Case>>);
  }
  return (
    nock('http://localhost:9010/api')
      .get(`/casemaster/search?caseOwner=${caseOwner}`)
      .reply(200, cases, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  );
};
export default setupNockTestData;
