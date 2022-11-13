import { useLocation, useNavigate } from 'react-router-dom';
import homeFill from '@iconify/icons-eva/home-fill';
import { Icon } from '@iconify/react';
import personFill from '@iconify/icons-eva/person-fill';
import { useMemo } from 'react';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import DarkModeSwitch from '../DarkModeSwitch';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import LocalStorageManager from '../../utils/LocalStorageManager';

const DesktopMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname]);
  const isProfilePage = useMemo(() => {
    return location.pathname === '/profile';
  }, [location.pathname]);

  return (
    <div className="relative lg:flex flex-col items-center hidden w-12 h-screen shadow-xl bg-white dark:bg-[#28282B]">
      <div className="mt-3 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src={`${process.env.PUBLIC_URL}/workout.png`}
          alt="workout_logo"
          className="max-w-[72px] max-h-[72px]"
        />
      </div>

      <div className="flex flex-col gap-y-3 mt-10">
        <Tooltip title="Exercises" arrow placement="right">
          <div
            className={classNames(
              `p-1.5 rounded-2xl cursor-pointer transition-all`,
              {
                'bg-[#4A9ECB] shadow-xl text-white hover:bg-[#0e6696]':
                  isHomePage,
                'text-[#4A9ECB] hover:text-[#0e6696]': !isHomePage,
              }
            )}
            onClick={() => navigate('/')}
          >
            <Icon icon={homeFill} fontSize={25} />
          </div>
        </Tooltip>

        <Tooltip title="Profile" arrow placement="right">
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
        </Tooltip>

        <Tooltip title="Switch color mode" arrow placement="right">
          <div className="p-1.5">
            <DarkModeSwitch />
          </div>
        </Tooltip>

        <Tooltip title="Log out" arrow placement="right">
          <div
            className="absolute bottom-7 text-[#4A9ECB] hover:text-[#0e6696] transition-all cursor-pointer p-1.5"
            onClick={() => {
              LocalStorageManager.removeLocalStorage();
              navigate('/login');
            }}
          >
            <Icon icon={logOutFill} fontSize={30} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default DesktopMenu;
