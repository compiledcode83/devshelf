const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const path = require('path');
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer');
const withPlugins = require('next-compose-plugins');
require('what-input');

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  ANALYZE,
} = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;

const basePath = '';

const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};

const config = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    if (ANALYZE) {
      config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'));
    }

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      VERCEL_GITHUB_COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: VERCEL_GITHUB_COMMIT_SHA,
        }),
      );
    }
    return config;
  },
  basePath,
};

config.serverRuntimeConfig = {
  rootDir: __dirname,
};

config.pwa = {
  dest: 'public',
  runtimeCaching,
};

config.sassOptions = {
  includePaths: [path.join(__dirname, 'styles')],
};

config.reactStrictMode = true;

config.experimental = {
  modern: true,
};

module.exports = withPlugins([], config);
