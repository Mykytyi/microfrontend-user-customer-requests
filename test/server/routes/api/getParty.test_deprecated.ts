// /**
//  * @jest-environment node
//  */
//
// import { resolve } from 'path';
// import { readFileSync } from 'fs';
// import nock from 'nock';
// import getParty from '../../../../src/server/routes/api/getParty';
//
// nock.disableNetConnect();
//
// describe('getParty', () => {
//   it('should map the result', async () => {
//     nock('http://soap-mock:6081', {
//       reqheaders: {
//         SOAPAction: (headerValue) => headerValue.includes('PartyProfile//getParty'),
//       },
//     })
//       .post('/esb/si:local')
//       .reply(200, readFileSync(resolve(__dirname, '../../../../esb-mock/data', 'getParty101101101.xml')).toString('utf-8'));
//
//     const req: any = {
//       user: {
//         authenticated: true,
//         userType: 'SL',
//       },
//       headers: {},
//       params: {
//         partyId: '108916385',
//       },
//     };
//     let response: any = null;
//     const res: any = {
//       json: (json: any) => { response = json; },
//     };
//
//     await getParty(req, res);
//
//     expect(response).toBeTruthy();
//     expect(response.givenName).toBe('Ludwicka');
//     expect(response.name).toBe('Monast');
//   });
//
//   it('should reject non-authenticated requests', async () => {
//     const req: any = {
//       user: {
//         authenticated: false,
//       },
//       headers: {},
//       params: {
//         partyId: '108916385',
//       },
//     };
//     let status;
//     const res: any = {
//       sendStatus: (stat: number) => { status = stat; },
//     };
//
//     await getParty(req, res);
//
//     expect(status).toBe(401);
//   });
// });
