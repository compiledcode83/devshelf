const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const path = require('path');
require('what-input');

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

const withPolyfills = (module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const originalEntry = config.entry;
      config.entry = function entry() {
        return Promise.resolve(originalEntry()).then((entries) => {
          if (entries['main.js'] && !entries['main.js'].includes('./polyfills.ts')) {
            entries['main.js'].unshift('./polyfills.ts');
          }

          return entries;
        });
      };

      const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === 'object');

      if (oneOf) {
        const moduleSassRule = oneOf.oneOf.find((rule) =>
          regexEqual(rule.test, /\.module\.(scss|sass)$/),
        );

        if (moduleSassRule) {
          const cssLoader = moduleSassRule.use.find(({ loader }) => loader.includes('css-loader'));
          if (cssLoader) {
            cssLoader.options.localsConvention = 'camelCase';
          }
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
});

const config = withSourceMaps(
  withPolyfills(
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
  ),
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
