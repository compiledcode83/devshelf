const withSourceMaps = require('@zeit/next-source-maps');
const withOptimizedImages = require('next-optimized-images');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const path = require('path');
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer');
// const withPlugins = require('next-compose-plugins');
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

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
});

const config = withPolyfills(
  withOptimizedImages({
    imagesFolder: 'images',

    webpack: (config, options) => {
      // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
      // @sentry/node will run in a Node.js environment. @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      // Define an environment variable so source code can check whether or not
      // it's running on the server so we can correctly initialize Sentry
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
  }),
);

config.sassOptions = {
  includePaths: [path.join(__dirname, 'styles')],
};

config.reactStrictMode = true;

config.experimental = {
  modern: true,
};

module.exports = config;
