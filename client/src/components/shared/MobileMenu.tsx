import classNames from 'classnames';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import personFill from '@iconify/icons-eva/person-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import DarkModeSwitch from '../DarkModeSwitch';
import LocalStorageManager from '../../utils/LocalStorageManager';

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
    <div className="lg:hidden fixed z-20 gap-x-3 justify-evenly bottom-0 items-center flex flex-row h-12 shadow-top dark:shadow-top-dark w-full bg-white dark:bg-[#28282B]">
      <div
        className={classNames(
          `p-1.5 rounded-2xl cursor-pointer transition-all`,
          {
            'bg-[#4A9ECB] shadow-xl text-white hover:bg-[#0e6696]': isHomePage,
            'text-[#4A9ECB] hover:text-[#0e6696]': !isHomePage,
          }
        )}
        onClick={() => navigate('/')}
      >
        <Icon icon={homeFill} fontSize={25} />
      </div>

      <div
        className={classNames(
          `p-1.5 rounded-2xl cursor-pointer transition-all`,
          {
            'bg-[#4A9ECB] shadow-xl text-white hover:bg-[#0e6696]':
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
        className="text-[#4A9ECB] hover:text-[#0e6696] transition-all cursor-pointer p-1.5"
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
