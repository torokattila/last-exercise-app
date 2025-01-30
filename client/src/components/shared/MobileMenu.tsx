import { Icon } from '@iconify/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import homeFill from '@iconify/icons-eva/home-fill';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import personFill from '@iconify/icons-eva/person-fill';
import LocalStorageManager from '../../utils/LocalStorageManager';
import DarkModeSwitch from '../DarkModeSwitch';

const MobileMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname]);
  const isProfilePage = useMemo(() => {
    return location.pathname === '/profile';
  }, [location.pathname]);

  return (
    <div
      style={{
        transform: 'translateX(-50%)',
      }}
      className={`
      fixed bottom-1 left-1/2 z-20 flex h-8 w-[96%] flex-row 
      items-center justify-evenly gap-x-3 rounded-full bg-white shadow-top 
      dark:bg-[#38383a] lg:hidden`}
    >
      <div
        className={classNames(
          `cursor-pointer rounded-2xl p-1.25 transition-all`,
          {
            'bg-[#4A9ECB] text-white shadow-xl hover:bg-[#0e6696]': isHomePage,
            'text-[#4A9ECB] hover:text-[#0e6696]': !isHomePage,
          }
        )}
        onClick={() => navigate('/')}
      >
        <Icon icon={homeFill} fontSize={24} />
      </div>

      <div
        className={classNames(
          `cursor-pointer rounded-2xl p-1.25 transition-all`,
          {
            'bg-[#4A9ECB] text-white shadow-xl hover:bg-[#0e6696]':
              isProfilePage,
            'text-[#4A9ECB] hover:text-[#0e6696]': !isProfilePage,
          }
        )}
        onClick={() => navigate('/profile')}
      >
        <Icon icon={personFill} fontSize={25} />
      </div>

      <div className="p-1.5">
        <DarkModeSwitch />
      </div>

      <div
        className="cursor-pointer p-1.25 text-[#4A9ECB] transition-all hover:text-[#0e6696]"
        onClick={() => {
          LocalStorageManager.removeLocalStorage();
          navigate('/login');
        }}
      >
        <Icon icon={logOutFill} fontSize={30} />
      </div>
    </div>
  );
};

export default MobileMenu;
