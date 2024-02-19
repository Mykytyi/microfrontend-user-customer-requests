const clearAllExpectations = require('./clearAllExpectations');
const addCaseMasterExpectations = require('./addCaseMasterExpectations');

async function setup() {
  await clearAllExpectations();
  await addCaseMasterExpectations();

  console.info('New mock data loaded');
}

setup();
