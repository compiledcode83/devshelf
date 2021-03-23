import { useEffect } from 'react';
import { fetcher } from '../utils/fetcher';

const Home = () => {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://api.devshelf.localhost:3002/books');
      const data = await res.json();
      console.log(data);
    }

    async function fetchDataWithFetcher() {
      const res = await fetcher('/books/{id}', 'get', { id: 4 });
      console.log(res);
    }

    fetchDataWithFetcher();
  }, []);
  return <h1>DevShelf</h1>;
};

export default Home;
