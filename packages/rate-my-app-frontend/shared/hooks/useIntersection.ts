import { useState, useEffect, MutableRefObject } from 'react';

const useIntersection = <T extends Element>(
  ref: MutableRefObject<T>,
  options: IntersectionObserverInit,
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      setIntersecting(isIntersecting);
    }, options);

    const currentRf = ref.current;

    observer.observe(currentRf);

    return () => {
      observer.unobserve(currentRf);
    };
  });

  return isIntersecting;
};

export default useIntersection;
