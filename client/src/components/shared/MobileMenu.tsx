import { Icon } from '@iconify/react';
import classNames from 'classnames';

import calendarFill from '@iconify/icons-eva/calendar-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import useMenu from '../../hooks/useMenu';
import DarkModeSwitch from '../DarkModeSwitch';

const MobileMenu = () => {
  const {
    isHomePage,
    isProfilePage,
    isExercisePage,
    handleNavigateToOtherPage,
    handleConfirmPageNavigation,
    isCalendarPage,
  } = useMenu();

  // Define your active and inactive icon colors
  const activeColor = '#1490d3';
  const inactiveColor = '#98bbcf';

  return (
    <div
      style={{
        transform: 'translateX(-50%)',
      }}
      className={`
        fixed bottom-0 left-1/2 z-20 flex h-10 w-full flex-row shadow-top
        items-center justify-evenly bg-white dark:bg-[#38383a] lg:hidden
      `}
    >
      <div
        className="flex flex-col items-center justify-center cursor-pointer transition-all"
        onClick={() => {
          if (isExercisePage) {
            handleConfirmPageNavigation('home');
          } else {
            handleNavigateToOtherPage('home');
          }
        }}
      >
        <Icon
          icon={homeFill}
          fontSize={24}
          color={isHomePage ? activeColor : inactiveColor}
        />
        <span
          className={classNames(
            'text-xs font-medium mt-1 transition-colors',
            {
              'text-[#1490d3]': isHomePage,
              'text-[#98bbcf]': !isHomePage,
            }
          )}
        >
          Home
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer transition-all"
        onClick={() => {
          if (isExercisePage) {
            handleConfirmPageNavigation('profile');
          } else {
            handleNavigateToOtherPage('profile');
          }
        }}
      >
        <Icon
          icon={personFill}
          fontSize={25}
          color={isProfilePage ? activeColor : inactiveColor}
        />
        <span
          className={classNames(
            'text-xs font-medium mt-1 transition-colors',
            {
              'text-[#1490d3]': isProfilePage,
              'text-[#98bbcf]': !isProfilePage,
            }
          )}
        >
          Profile
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer transition-all"
        onClick={() => {
          if (isExercisePage) {
            handleConfirmPageNavigation('calendar');
          } else {
            handleNavigateToOtherPage('calendar');
          }
        }}
      >
        <Icon
          icon={calendarFill}
          fontSize={25}
          color={isCalendarPage ? activeColor : inactiveColor}
        />
        <span
          className={classNames(
            'text-xs font-medium mt-1 transition-colors',
            {
              'text-[#1490d3]': isCalendarPage,
              'text-[#98bbcf]': !isCalendarPage,
            }
          )}
        >
          Calendar
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <DarkModeSwitch />
        <span className="text-xs font-medium text-[#98bbcf] mt-1">Theme</span>
      </div>
    </div>
  );
};

export default MobileMenu;
