import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialState: T) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
