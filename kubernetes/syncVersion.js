const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const packageJson = require('../package.json');

/*
  Sync the version in package.json with the image version in kustomization.yaml
  Will be triggered by the CD pipeline
*/

const newVersion = packageJson.version;

const kustomizationYamlPath = resolve(__dirname, 'kustomization.yaml');
const kustomization = readFileSync(kustomizationYamlPath).toString('utf-8');
const currentVersion = kustomization
  .split('\n')
  .find((line) => line.indexOf('app.kubernetes.io/version:') !== -1)
  .split(':')[1]
  .trim();

console.info('Current DEV version:', currentVersion);
console.info('Updating with version:', newVersion);

const updatedDeployment = kustomization.replaceAll(currentVersion, newVersion);

writeFileSync(kustomizationYamlPath, updatedDeployment);
