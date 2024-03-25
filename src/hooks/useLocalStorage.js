import { useState } from "react";
import { saveToStorage, getFromStorage } from "../utils/storage";

const useLocalStorage = (key, initialValue) => {
  const storedValue = getFromStorage(key);

  const [value, setValue] = useState(
    storedValue !== null ? storedValue : initialValue
  );

  const setStoredValue = (newValue) => {
    setValue(newValue);
    saveToStorage(key, newValue);
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
