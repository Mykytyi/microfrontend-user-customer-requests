// Pass a custom babel config file to babel-jest
// Otherwise ES5 code in node_modules would not be transpiled

const path = require('path');
const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  configFile: path.resolve(__dirname, 'babel.config.js'),
});
