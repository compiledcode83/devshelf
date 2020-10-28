import { useState, useCallback } from 'react';

type StorageError = null | Error;
type SetValue<T> = (value: T) => void;

const useLocalStorage = <T>(key: string, initialValue = '') => {
  const [error, setError] = useState<StorageError>(null);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setError(error);
      return initialValue;
    }
  });

  const isFnInstance = useCallback(
    (value: T) => {
      if (value instanceof Function) {
        return value(storedValue);
      }
      return value;
    },
    [storedValue],
  );

  const deleteItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      setError(error);
    }
  }, [key]);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const valueToStore = isFnInstance(value);
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        setError(error);
      }
    },
    [key, isFnInstance],
  );

  return [storedValue, setValue, deleteItem, error] as const;
};

export default useLocalStorage;
