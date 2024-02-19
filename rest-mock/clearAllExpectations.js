const { mockServerClient } = require('mockserver-client');
const { CASE_MASTER_SERVICE } = require('./constants');

async function clearAll() {
  await mockServerClient('localhost', 6081)
    .clear({
      httpRequest: {
        path: '/esb/si:local',
        headers: {
          'X-GUCCI-CALLER-NAME': ['microfrontend-user-customer-requests'],
        },
      },
    });
  await mockServerClient('localhost', 6081)
    .clear({
      httpRequest: {
        path: `${CASE_MASTER_SERVICE}/.*`,
      },
    });
  console.info('Old dummy data has been deleted');
}

module.exports = clearAll;
