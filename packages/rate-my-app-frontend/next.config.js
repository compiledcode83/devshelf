const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const path = require('path');

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
} = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;

const basePath = '';

const config = withSourceMaps(
  withImages({
    serverRuntimeConfig: {
      rootDir: __dirname,
    },
    webpack: (config, options) => {
      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
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
  }),
);

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

module.exports = config;
