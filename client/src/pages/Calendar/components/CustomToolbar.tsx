import { NavigateAction } from 'react-big-calendar';

const CustomToolbar = ({
  label,
  onNavigate,
}: {
  label: string;
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-[#4A9ECB] py-[7%] text-white shadow-md">
      <span className="text-2xl font-bold">{label}</span>
      <div className="mt-3 flex flex-row gap-x-1">
        <button
          className="rounded-xl bg-white dark:bg-[#38383a] px-3 py-1 text-lg font-bold text-[#4A9ECB] dark:text-[#fff] shadow-2xl uppercase"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          className="rounded-xl bg-white dark:bg-[#38383a] px-3 py-1 text-lg font-bold text-[#4A9ECB] dark:text-[#fff] shadow-2xl uppercase"
          onClick={() => onNavigate('PREV')}
        >
          Back
        </button>
        <button
          className="rounded-xl bg-white dark:bg-[#38383a] px-3 py-1 text-lg font-bold text-[#4A9ECB] dark:text-[#fff] shadow-2xl uppercase"
          onClick={() => onNavigate('NEXT')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
