import Head from 'next/head';
import getConfig from 'next/config';
import type { AppProps } from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import type { ReactQueryConfig } from 'react-query';
import { ReactQueryCacheProvider, QueryCache, ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import type { DehydratedState } from 'react-query/hydration';
import { Hydrate } from 'react-query/hydration';
import ErrorBoundary from 'components/app/shared/components/errorBoundary/ErrorBoundary';
import 'styles/main.scss';
const isProduction = process.env.NODE_ENV === 'production';
const isBrowser = typeof window !== 'undefined';

if (!isProduction && isBrowser) {
  const axe = require('react-axe');
  const AXE_DELAY = 1000;
  axe(React, ReactDOM, AXE_DELAY);
}

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: isProduction,
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          if (frame.filename) {
            frame.filename = frame.filename.replace(distDir, 'app:///_next');
          }
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

type AppPageProps = AppProps & { err: any };

const queryCache = new QueryCache();
const reactQueryConfigOverrides: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
  mutations: {
    throwOnError: true,
  },
} as const;

const App = ({ Component, pageProps, err }: AppPageProps) => {
  const { dehydratedState } = pageProps as { readonly dehydratedState?: DehydratedState };
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
        />
        <meta property="og:type" content="website" />
        <meta name="apple-mobile-web-app-title" content="DevFeedback" />
      </Head>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryConfigProvider config={reactQueryConfigOverrides}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <Component {...pageProps} err={err} />
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </ReactQueryConfigProvider>
      </ReactQueryCacheProvider>
    </>
  );
};
export default App;
