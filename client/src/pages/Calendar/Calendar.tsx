import { format, getDay, parse, startOfWeek } from 'date-fns';
import hu from 'date-fns/locale/hu';
import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import useHome from '../../hooks/useHome';
import './Calendar.css';
import CustomToolbar from './components/CustomToolbar';

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

type CalendarEvent = {
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

  return (
    <div
      className={'h-[100vh] w-full overflow-x-auto bg-white dark:bg-[#28282B]'}
    >
      <Calendar
        toolbar={true}
        localizer={localizer}
        events={events}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default CalendarPage;
