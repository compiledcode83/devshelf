import * as Sentry from '@sentry/node';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import { RewriteFrames } from '@sentry/integrations';

const isProduction = process.env.NODE_ENV === 'production';

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

type Props = AppProps & { err: any };

const App = ({ Component, pageProps, err }: Props) => <Component {...pageProps} err={err} />;

export default App;
