import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import DarkModeSwitch from '../DarkModeSwitch';

import homeFill from '@iconify/icons-eva/home-fill';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { Icon } from '@iconify/react';
import useMenu from '../../hooks/useMenu';

const DesktopMenu = () => {
  const navigate = useNavigate();
  const {
    handleLogoutConfirm,
    isHomePage,
    isProfilePage,
    handleNavigateToProfilePage,
  } = useMenu();

  return (
    <div className="fixed hidden h-screen w-12 flex-col items-center bg-white shadow-xl dark:bg-[#28282B] lg:flex">
      <div className="mt-3 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src={`${process.env.PUBLIC_URL}/workout.png`}
          alt="workout_logo"
          className="max-h-[72px] max-w-[72px]"
        />
      </div>

      <div className="mt-10 flex flex-col gap-y-3">
        <Tooltip title="Exercises" arrow placement="right">
          <div
            className={classNames(
              `cursor-pointer rounded-2xl p-1.5 transition-all`,
              {
                'bg-[#4A9ECB] text-white shadow-xl hover:bg-[#0e6696]':
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
              `cursor-pointer rounded-2xl p-1.5 transition-all`,
              {
                'bg-[#4A9ECB] text-white shadow-xl hover:bg-[#0e6696]':
                  isProfilePage,
                'text-[#4A9ECB] hover:text-[#0e6696]': !isProfilePage,
              }
            )}
            onClick={handleNavigateToProfilePage}
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
            className="absolute bottom-7 cursor-pointer p-1.5 text-[#4A9ECB] transition-all hover:text-[#0e6696]"
            onClick={handleLogoutConfirm}
          >
            <Icon icon={logOutFill} fontSize={30} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default DesktopMenu;
