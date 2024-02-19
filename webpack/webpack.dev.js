const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

const { HotModuleReplacementPlugin } = webpack;

module.exports = merge(common, {
  entry: {
    bundle: [
      'webpack-hot-middleware/client?reload=true',

      // -- Default Theme --
      '@a1/gucci-common-ui/lib/gucci_common.css',
      // -- A1.net FRESH Theme --
      // '@a1/gucci-3rd-party-integration/lib/A1.net-FRESH/theme.css',
      // '@a1/gucci-3rd-party-integration/lib/A1.net-FRESH/gucci.css',
      // -- A1.net (old) Theme --
      // '@a1/gucci-3rd-party-integration/lib/A1.net/a1_core.css',
      // '@a1/gucci-3rd-party-integration/lib/A1.net/gucci.css',
      // -- RedBullMobile Theme --
      // '@a1/gucci-3rd-party-integration/lib/RedBullMobile.at/redbullmobile_core.css',
      // '@a1/gucci-3rd-party-integration/lib/RedBullMobile.at/gucci.css',

      // Include icon font for local dev
      '@a1/gucci-common-ui/lib/assets/fonts/font-decls.scss',

      path.resolve(__dirname, '../src/frontend'),
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});
