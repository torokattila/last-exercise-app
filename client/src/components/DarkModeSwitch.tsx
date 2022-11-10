import { useEffect, useState } from 'react';
import * as Storage from '../lib/storage';

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    Storage.getItem('mode') === 'dark'
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark', 'c_darkmode');
      Storage.setItem('mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark', 'c_darkmode');
      Storage.setItem('mode', 'light');
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggleDarkMode}>
      DarkMode
    </button>
  );
};

export default DarkModeSwitch;
