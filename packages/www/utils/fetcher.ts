import { ResponseError } from './responseError';
import { compileURL } from './compileURL';
import { getJSON } from './getJSON';

import type { Paths } from '@devshelf/types';

type MethodType<CurrentPath extends keyof Paths> = keyof Paths[CurrentPath];

const b = `/books => get => {parameters: {path}} ? typeof <-this : {}`;

type ParamsType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  parameters: { path: infer Params };
}
  ? Params
  : {};

type QueryType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  parameters: { query: infer Query };
}
  ? Query
  : {};

type BodyType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  requestBody: { 'application/json': infer Body };
}
  ? Body
  : null;

type HttpOkayCodes = '200' | '201';

export async function fetcher<
  CurrentPath extends keyof Paths,
  Method extends MethodType<CurrentPath>
>(
  path: CurrentPath,
  method: Method,
  params?: ParamsType<CurrentPath, Method>,
  query?: QueryType<CurrentPath, Method>,
  body?: BodyType<CurrentPath, Method>,
): Promise<
  Paths[CurrentPath][Method] extends {
    responses: { [K in HttpOkayCodes]?: { 'application/json': infer Response } };
  }
    ? Response
    : undefined
> {
  const url = compileURL(path, params as Record<string, string>, query as Record<string, string>);
  const methodString = method as string;
  const response = await fetch(url, {
    method: method && methodString.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...(body && { body: JSON.stringify(body) }),
  });
  const data = await getJSON(response);

  if (response.ok) {
    return data as any;
  }

  throw new ResponseError(response.statusText, response.status, data);
}
