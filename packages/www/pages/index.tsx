import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';
import { Components } from '@devshelf/types';

async function fetchDataWithFetcher() {
  const data = await fetcher('/books', 'get');
  return data;
}

const Home = () => {
  const { data, isLoading } = useQuery<Components['schemas']['BookDto'][]>(
    'books',
    fetchDataWithFetcher,
  );
  return (
    <>
      {!isLoading &&
        data &&
        data.map(({ title, description }) => (
          <>
            <h2>{title}</h2>
            <p>{description}</p>
          </>
        ))}
    </>
  );
};

export default Home;
