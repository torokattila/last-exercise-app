const getItem = (name: string): string | null => {
  return localStorage.getItem(name);
};

const setItem = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

const removeItem = (name: string): void => {
  localStorage.removeItem(name);
};

export { getItem, setItem, removeItem };
