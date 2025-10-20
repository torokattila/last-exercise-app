import {
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isWithinInterval,
  parse,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Icon } from '@iconify/react';
import close from '@iconify/icons-eva/close-fill';
import hu from 'date-fns/locale/hu';
import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// @ts-ignore
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useHome from '../../hooks/useHome';
// @ts-ignore
import './Calendar.css';
import CustomToolbar from './components/CustomToolbar';
import { getItem } from '../../lib/storage';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmAlertLayout from '../../components/shared/ConfirmAlertLayout';

const locales = {
  hu: hu,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { locale: hu }),
  getDay,
  locales,
});

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  cardColor: string;
  textColor: string;
  allDay?: boolean;
};

const eventStyleGetter = (
  event: CalendarEvent,
  start: Date,
  end: Date,
  isSelected: boolean
) => {
  return {
    style: {
      backgroundColor: event.cardColor,
      color: event.textColor,
    },
  };
};

const CalendarPage = () => {
  const isDarkMode = getItem('mode') === 'dark';
  const { user } = useHome();
  const events: CalendarEvent[] = useMemo(() => {
    return (
      user?.exerciseHistory?.map((history) => ({
        title: history?.exercise?.name ?? '',
        start: new Date(history.date),
        end: new Date(history.date),
        cardColor: history?.exercise?.cardColor ?? '',
        textColor: history?.exercise?.textColor ?? '',
        allDay: true,
      })) ?? []
    );
  }, [user?.exerciseHistory]);
  const workoutsThisWeek = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { locale: hu });
    const weekEnd = endOfWeek(today, { locale: hu });

    return (
      user?.exerciseHistory?.filter((history) =>
        isWithinInterval(new Date(history.date), {
          start: weekStart,
          end: weekEnd,
        })
      ).length ?? 0
    );
  }, [user?.exerciseHistory]);
  const workoutsThisMonth = useMemo(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    return (
      user?.exerciseHistory?.filter((history) =>
        isWithinInterval(new Date(history.date), {
          start: monthStart,
          end: monthEnd,
        })
      ).length ?? 0
    );
  }, [user?.exerciseHistory]);

  const handleEventClick = (event: CalendarEvent) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout classNames="w-[80%] rounded-3xl h-24 p-2 bg-[#3c3c3c]">
            <div>
              <div className="flex justify-end gap-2">
                <button
                  className="rounded-full border-4 border-white bg-transparent p-1 text-sm font-semibold text-gray-800"
                  onClick={onClose}
                >
                  <Icon
                    icon={close}
                    className="font-bold text-white transition-all"
                    fontSize={30}
                  />
                </button>
              </div>
              <h2 className="ml-2 mt-2 text-3xl font-bold text-white">
                {event.title}
              </h2>
            </div>
          </ConfirmAlertLayout>
        );
      },
    });
  };

  return (
    <div className="flex-container flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-[#2c2c2c]">
      {/* Cards Section */}
      <div className="cards mb-5 -mt-[20%] flex flex-row gap-4">
        <div className="card flex-1 rounded-3xl bg-white p-3 shadow-md dark:bg-[#3c3c3c]">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white">
            {workoutsThisWeek}
          </h2>
          <p className="text-md mt-1 font-bold text-gray-600 dark:text-gray-300">
            Workouts this week
          </p>
        </div>
        <div className="card flex-1 rounded-3xl bg-white p-3 shadow-md dark:bg-[#3c3c3c]">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white">
            {workoutsThisMonth}
          </h2>
          <p className="text-md mt-1 font-bold text-gray-600 dark:text-gray-300">
            Workouts this month
          </p>
        </div>
      </div>

      <div
        className={
          'h-[58vh] w-full max-w-4xl justify-center overflow-x-auto rounded-3xl bg-white shadow-lg dark:bg-[#353535]'
        }
      >
        <style>{`
          .rbc-day-bg {
            background-color: ${isDarkMode ? '#252525' : '#fff'};
          }
          .rbc-button-link {
            color: ${isDarkMode ? '#FFFFFF' : '#000000'};
          }
        `}</style>
        <Calendar
          toolbar={true}
          localizer={localizer}
          events={events}
          onSelectEvent={handleEventClick}
          defaultView="month"
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
