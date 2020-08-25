import NextErrorComponent, { ErrorProps } from 'next/error';
import * as Sentry from '@sentry/node';
import { NextPageContext } from 'next';

type PromiseValue<T extends Promise<any>> = T extends Promise<infer R> ? R : T;

const MyError = (ctx: PromiseValue<ReturnType<typeof getInitialProps>> & NextPageContext) => {
  if (!('hasGetInitialPropsRun' in ctx && ctx.hasGetInitialPropsRun) && ctx.err) {
    Sentry.captureException(ctx.err);
  }

  return <NextErrorComponent statusCode={ctx.statusCode} />;
};

const getInitialProps = async (ctx: NextPageContext) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(ctx);

  if (ctx.res?.statusCode === 404) {
    return { statusCode: 404 };
  }
  if (ctx.err) {
    Sentry.captureException(ctx.err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${ctx.asPath}`),
  );
  await Sentry.flush(2000);

  return {
    ...errorInitialProps,
    hasGetInitialPropsRun: true,
  };
};

MyError.getInitialProps = getInitialProps;

export default MyError;
