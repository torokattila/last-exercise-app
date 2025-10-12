const getItem = (name: string): string | null => {
  return localStorage.getItem(name);
};

const setItem = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

const removeItem = (name: string): void => {
  localStorage.removeItem(name);
};

const removeItemsWithPrefix = (prefix: string): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
};

export { getItem, setItem, removeItem, removeItemsWithPrefix };
