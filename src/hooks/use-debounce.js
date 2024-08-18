import { useState, useEffect, useRef } from 'react';

function useDebounce({ value, delay }) {
  const [debounceValue, setDebounceValue] = useState(value);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
}

export default useDebounce;
