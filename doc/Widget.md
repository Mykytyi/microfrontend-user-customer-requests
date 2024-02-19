
# User Customers Requests

## Description

This widget shall be similar to a WIPbin in CRM. With this application agents should get access to a list of their postponed orders and cases (fixed mobile and pure master cases) in One Cockpit in the Home Screen, to be able to open and work on them. Additionally, accepted cases should also be shown in this list.

## Sandbox Testing

Data for testing:
- INT:
1. Summary view
```json
{
  "caseOwner": "q392480",
  "view": "SUMMARY"
}
```
2.
```json
{
  "caseOwner": "uyed7wl",
  "view": "SUMMARY"
}
```
3. Table view
```json
{
  "caseOwner": "q392480",
  "view": "TABLE"
}
```
4.
```json
{
  "caseOwner": "uyed7wl",
  "view": "TABLE"
}
```

CaseMaster service - microservice-genesys-broker
- Swagger-DEV: https://genesys-broker-dev.gucci-qa.at.inside/swagger-ui.html#/case-master-rest-services
- Swagger-INT: https://genesys-broker-int.gucci-qa.at.inside/swagger-ui.html#/case-master-rest-services
