# User Customers Requests

## Development

### Prerequisites

* Node 18 LTS

### Start the local dev server

    npm install
    npm run setup:rest-mock
    npm run start:dev

Open in web browser _[http://localhost:9010](http://localhost:9010)_

### Additional information about functionality

- The caseOwner parameter is only for DEV, INT environments. According to business logic, the parameter should be
automatically taken from a portalAppSetup configuration entity.
- To prevent a user from having access to the cases of other users, a validator was added to the BFF so the user
can only request his own cases. To disable this functionality the ENABLE_MASTER_CASE_VALIDATION parameter should be false.
