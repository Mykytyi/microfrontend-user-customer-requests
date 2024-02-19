// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFileSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mockServerClient } = require('mockserver-client');

const addRestExpectations = async (expectations) => {
  await mockServerClient('localhost', 6081).mockAnyResponse(
    expectations.map(
      ({
        method,
        path,
        queryStringParameters,
        bodyMatcher,
        bodyRegexMatcher,
        statusCode,
        responseFile,
        delayMs,
        times,
      }) => ({
        httpRequest: {
          method,
          path,
          queryStringParameters,
          // eslint-disable-next-line no-nested-ternary
          body: bodyMatcher
            ? {
              type: 'JSON',
              matchType: 'ONLY_MATCHING_FIELDS',
              json: bodyMatcher,
            }
            : bodyRegexMatcher
              ? {
                type: 'REGEX',
                regex: bodyRegexMatcher,
              }
              : undefined,
        },
        times: times
          ? {
            remainingTimes: times,
          }
          : undefined,
        httpResponse: {
          statusCode: statusCode || 200,
          body: {
            contentType: 'application/json; charset=utf-8',
            json: responseFile
              ? readFileSync(resolve(__dirname, '../data', responseFile)).toString('utf-8')
              : '',
          },
          delay: {
            timeUnit: 'MILLISECONDS',
            value: delayMs || 0,
          },
        },
      }),
    ),
  );
};

module.exports = addRestExpectations;
