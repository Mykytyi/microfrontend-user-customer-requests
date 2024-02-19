
const { resolve } = require('path');
const { readFileSync } = require('fs');
const { mockServerClient } = require('mockserver-client');

const addSoapExpectations = async (expectations) => {
  await mockServerClient('localhost', 6081)
    .mockAnyResponse(expectations.map(({
      serviceName, operation, xpath, statusCode, responseFile, delayMs,
    }) => ({
      httpRequest: {
        method: 'POST',
        path: '/esb/si:local',
        headers: {
          SOAPAction: [`.*/${serviceName}//${operation}/.*`],
          'X-GUCCI-CALLER-NAME': ['microfrontend-user-customer-requests'],
        },
        body: {
          type: 'XPATH',
          xpath,
        },
      },
      httpResponse: {
        statusCode: statusCode || 200,
        body: {
          xml: responseFile ? readFileSync(resolve(__dirname, 'data', responseFile)).toString('utf-8') : '',
        },
        delay: {
          timeUnit: 'MILLISECONDS',
          value: delayMs || 0,
        },
      },
    })));
};

module.exports = addSoapExpectations;
