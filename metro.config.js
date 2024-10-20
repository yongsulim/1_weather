/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

module.exports = {
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'mjs'],
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'otf', 'ttf', 'eot', 'woff', 'woff2'],
  },
  watchFolders: [
    path.resolve(__dirname, 'node_modules'),
  ],
};
