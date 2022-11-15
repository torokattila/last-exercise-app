import { useEffect, useState } from 'react';
import * as Storage from '../lib/storage';
import moonFill from '@iconify/icons-eva/moon-fill';
import sunFill from '@iconify/icons-eva/sun-fill';
import { Icon } from '@iconify/react';

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
      document.body.style.backgroundColor = '#28282B';
      Storage.setItem('mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark', 'c_darkmode');
      document.body.style.backgroundColor = 'white';
      Storage.setItem('mode', 'light');
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggleDarkMode}>
      <div className="text-[#4A9ECB] hover:text-[#0e6696]">
        {isDarkMode ? (
          <Icon icon={sunFill} fontSize={25} />
        ) : (
          <Icon icon={moonFill} fontSize={25} />
        )}
      </div>
    </button>
  );
};

export default DarkModeSwitch;
