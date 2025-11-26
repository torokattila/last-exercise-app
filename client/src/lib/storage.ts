const getItem = (name: string): string | null => {
  return localStorage.getItem(name);
};

const setItem = (name: string, value: string): void => {
  localStorage.setItem(name, value);

  window.dispatchEvent(
    new CustomEvent('localStorageUpdated', {
      detail: { key: name, value },
    })
  );
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);

  window.dispatchEvent(
    new CustomEvent('localStorageUpdated', {
      detail: { key, value: null },
    })
  );
};

const removeItemsWithPrefix = (prefix: string): void => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });

  window.dispatchEvent(
    new CustomEvent('localStorageUpdated', {
      detail: { key: prefix, value: null },
    })
  );
};

export { getItem, setItem, removeItem, removeItemsWithPrefix };
