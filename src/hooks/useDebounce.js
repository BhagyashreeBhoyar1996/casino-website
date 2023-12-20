import { useState, useEffect } from "react";

/**
 * @function
 * @description this funtion is use for to add some delay 
 * @param {*} value 
 * @param {number} delay 
 * @returns {*} return any with having some delay
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
