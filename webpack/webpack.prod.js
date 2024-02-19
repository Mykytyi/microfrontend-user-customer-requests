const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {
    bundle: path.resolve(__dirname, '../src/frontend'),
  },
  mode: 'production',
  performance: {
    // Instead of changing this try to find out why the bundle is so big
    hints: 'error',
    maxEntrypointSize: 700000,
    maxAssetSize: 700000,
  },
});
