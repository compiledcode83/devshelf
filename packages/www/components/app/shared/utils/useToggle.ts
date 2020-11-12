import { useState, useCallback } from 'react';

const useToggle = (initialOn = false) => {
  const [on, setOn] = useState(initialOn);
  const toggle = useCallback(() => {
    setOn((on) => !on);
  }, []);

  const closeMenu = useCallback(() => {
    setOn(false);
  }, []);

  return [on, toggle, closeMenu] as const;
};

export default useToggle;
