import { useEffect, useState } from 'react';
import { ResponseError } from '../utils/responseError';

type Status = 'idle' | 'loading' | 'success' | 'error';

type QueryData<Data> = {
  readonly value: Data | null;
  readonly status: Status;
  readonly errorCode?: number;
};

export const useQuery = <Data>(queryFunc: () => Promise<Data>) => {
  const [queryData, setQueryData] = useState<QueryData<Data>>({
    value: null,
    status: 'idle',
  });

  useEffect(() => {
    const fetchData = async () => {
      setQueryData((queryData) => ({ ...queryData, status: 'loading' }));
      try {
        const data = await queryFunc();
        setQueryData({ value: data, status: 'success' });
      } catch (err) {
        if (err instanceof ResponseError) {
          setQueryData({ value: null, status: 'error', errorCode: err.status });
        }
        setQueryData({ value: null, status: 'error' });
      }
    };
    fetchData();
  }, [queryFunc]);

  return queryData;
};
