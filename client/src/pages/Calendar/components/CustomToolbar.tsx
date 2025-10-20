import { NavigateAction } from 'react-big-calendar';
import { Icon } from '@iconify/react';
import calendar from '@iconify/icons-eva/calendar-fill';
import chevronRight from '@iconify/icons-eva/chevron-right-outline';
import chevronLeft from '@iconify/icons-eva/chevron-left-outline';

const CustomToolbar = ({
  label,
  onNavigate,
}: {
  label: string;
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-[#4A9ECB] pb-[5%] text-white shadow-md">
      <div className="mt-3 flex flex-row gap-x-2">
        <div className="flex flex-row items-center gap-2">
          <button
            className="rounded-full bg-white p-2 text-[#4A9ECB] shadow-2xl dark:bg-[#38383a] dark:text-[#fff]"
            onClick={() => onNavigate('TODAY')}
          >
            <Icon
              icon={calendar}
              className="text-[#4A9ECB] transition-all dark:text-gray-300"
              fontSize={30}
            />
          </button>
          <span className="text-2xl font-bold">{label}</span>
        </div>
        <div className="flex flex-row items-center justify-cente gap-1">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#4A9ECB] shadow-2xl dark:bg-[#38383a] dark:text-[#fff]"
            onClick={() => onNavigate('PREV')}
          >
            <Icon
              icon={chevronLeft}
              className="text-[#4A9ECB] transition-all dark:text-gray-300"
              fontSize={42}
            />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#4A9ECB] shadow-2xl dark:bg-[#38383a] dark:text-[#fff]"
            onClick={() => onNavigate('NEXT')}
          >
            <Icon
              icon={chevronRight}
              className="text-[#4A9ECB] transition-all dark:text-gray-300"
              fontSize={42}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
