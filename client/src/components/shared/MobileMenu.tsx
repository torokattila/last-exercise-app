import { Icon } from '@iconify/react';
import classNames from 'classnames';

import homeFill from '@iconify/icons-eva/home-fill';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import personFill from '@iconify/icons-eva/person-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import useMenu from '../../hooks/useMenu';
import DarkModeSwitch from '../DarkModeSwitch';

const MobileMenu = () => {
  const {
    handleLogoutConfirm,
    isHomePage,
    isProfilePage,
    isExercisePage,
    handleNavigateToOtherPage,
    handleConfirmPageNavigation,
    isCalendarPage,
  } = useMenu();

  return (
    <div
      style={{
        transform: 'translateX(-50%)',
      }}
      className={`
      fixed bottom-1 left-1/2 z-20 flex h-8 w-[95%] flex-row 
      items-center justify-evenly gap-x-1 rounded-full bg-white shadow-top 
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
        onClick={() => {
          if (isExercisePage) {
            handleConfirmPageNavigation('home');
          } else {
            handleNavigateToOtherPage('home');
          }
        }}
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
        onClick={() => {
          if (isExercisePage) {
            handleConfirmPageNavigation('profile');
          } else {
            handleNavigateToOtherPage('profile');
          }
        }}
      >
        <Icon icon={personFill} fontSize={25} />
      </div>

      <div
        className={classNames(
          `cursor-pointer rounded-2xl p-1.25 transition-all`,
          {
            'bg-[#4A9ECB] text-white shadow-xl hover:bg-[#0e6696]':
            isCalendarPage,
            'text-[#4A9ECB] hover:text-[#0e6696]': !isCalendarPage,
          }
        )}
        onClick={() => {
          if (isExercisePage) {
            handleConfirmPageNavigation('calendar');
          } else {
            handleNavigateToOtherPage('calendar');
          }
        }}
      >
        <Icon icon={calendarFill} fontSize={25} />
      </div>

      <div className="pt-1.25">
        <DarkModeSwitch />
      </div>

      <div
        className="cursor-pointer p-1.25 text-[#4A9ECB] transition-all hover:text-[#0e6696]"
        onClick={handleLogoutConfirm}
      >
        <Icon icon={logOutFill} fontSize={30} />
      </div>
    </div>
  );
};

export default MobileMenu;
