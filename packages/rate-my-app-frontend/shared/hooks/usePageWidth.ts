import { useEffect, useState, useCallback } from 'react';

const isClient = typeof window === 'object';

const usePageWidth = (initialWidth = 0) => {
  const [pageWidth, setPageWidth] = useState<number>(isClient ? window.innerWidth : initialWidth);

  const updateDimensions = useCallback(() => {
    setPageWidth(window.innerWidth);
  }, []);

  useEffect((): (() => void) | void => {
    if (isClient) {
      window.addEventListener('resize', updateDimensions);
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, [updateDimensions]);

  return pageWidth;
};

export default usePageWidth;
