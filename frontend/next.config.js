const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const LINK_PREFIX = process.env.NEXT_PUBLIC_LINK_PREFIX || '';

module.exports = () => ({
  target: 'serverless',
  poweredByHeader: false,
  assetPrefix: LINK_PREFIX,

  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
        new DuplicatePackageCheckerPlugin({
          strict: true,
          verbose: true,
        })
      );
    }
    config.resolve.alias.react = path.resolve(
      __dirname,
      'node_modules',
      'react'
    );
    config.resolve.alias['detect-browser'] = path.resolve(
      __dirname,
      'node_modules',
      'detect-browser'
    );
    return config;
  },
});
