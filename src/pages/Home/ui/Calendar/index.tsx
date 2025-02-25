import { useState, useRef, useEffect, useCallback, memo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  DatesSetArg,
  EventClickArg,
  CalendarApi,
  DayCellContentArg,
} from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import { Arrow } from 'shared/icons';
import { CalendarPlusIcon, CalendarSearchIcon } from 'features/Home/ui';
import { CalendarModal, CalendarToggle } from 'features/Home/Calendar';
import { CalendarEvent } from 'entities/calendar/type';
import * as s from './style.css';
import './root.css';
import theme from 'shared/styles/theme.css';
import { useScheduleListMutation } from 'features/Home/services/home.mutation';

const EventContent = memo(({ event }: { event: EventImpl }) => {
  const isSchedule = event.extendedProps.type === 'Schedule';
  return (
    <div
      className={
        isSchedule ? s.calendarScheduleContainer : s.calendarTodoContainer
      }
    >
      <span
        className={isSchedule ? s.calendarScheduleText : s.calendarTodoText}
        style={{ color: isSchedule ? theme.blue[500] : theme.black }}
      >
        {event.title}
      </span>
    </div>
  );
});

const useCalendarNavigation = (calendarRef: React.RefObject<FullCalendar>) => {
  const [calendar, setCalendar] = useState<CalendarApi | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      setCalendar(api);
      updateDateRange(api);
    }
  }, []);

  const updateDateRange = (api: CalendarApi) => {
    setDateRange({
      startDate:
        api.view.currentStart.toISOString().split('T')[0] + 'T00:00:00',
      endDate: api.view.currentEnd.toISOString().split('T')[0] + 'T00:00:00',
    });
  };

  const navigate = useCallback(
    (action: 'prev' | 'next' | 'today') => {
      if (calendar) {
        calendar[action]();
        updateDateRange(calendar);
      }
    },
    [calendar]
  );

  return { navigate, dateRange };
};

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent | undefined
  >();
  const [currentDate, setCurrentDate] = useState({ year: 0, month: 0 });
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { navigate, dateRange } = useCalendarNavigation(calendarRef);

  const { postScheduleListMutate } = useScheduleListMutation({
    startDate: dateRange?.startDate || '',
    endDate: dateRange?.endDate || '',
    categoryIds: [3], // 추후 카테고리 id 불러오는 api 값으로 변경
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const convertedEvents = await postScheduleListMutate();
        setEvents(convertedEvents);
      } catch (error) {}
    };

    fetchEvents();
  }, [dateRange]);

  const toggleCalendar = useCallback(
    () => setIsToggleVisible((prev) => !prev),
    []
  );
  const handleModalOpen = useCallback((event?: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
  }, []);

  const handleDateClick = useCallback(({ date }: { date: Date }) => {
    handleModalOpen({
      type: 'Schedule',
      title: '',
      start: date.toISOString(),
      end: date.toISOString(),
      startEditable: true,
      durationEditable: true,
      allDay: true,
      isRepeat: false,
      category: 1,
      location: null,
    });
  }, []);

  const handleEventClick = useCallback((info: EventClickArg) => {
    const { type, ...props } = info.event.extendedProps;
    handleModalOpen({
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      startEditable: true,
      isRepeat: false,
      memo: props.memo,
      location: props.location,
      durationEditable: type === 'Schedule',
      allDay: info.event.allDay,
      category: type === 'Schedule' ? 1 : undefined,
      priority: type === 'Todo' ? props.priority || 2 : undefined,
      type,
    });
  }, []);

  const handleDatesSet = ({ view }: DatesSetArg) => {
    setCurrentDate({
      year: view.currentStart.getFullYear(),
      month: view.currentStart.getMonth() + 1,
    });
  };

  useEffect(() => {
    console.log(dateRange?.startDate);
    console.log(dateRange?.endDate);
  });
  return (
    <div className={s.calendarContainer}>
      <div className={s.calendarHeaderContainer}>
        <div className={s.calendarHeaderMain}>
          <div className={s.calendarHeaderPlusBtn} onClick={toggleCalendar}>
            <CalendarPlusIcon />
            {isToggleVisible && (
              <CalendarToggle onModalOpen={handleModalOpen} />
            )}
          </div>
          <div className={s.calendarHeaderSub}>
            <div className={s.calendarHeaderBtnLayout}>
              <Arrow
                direction="left"
                size={26}
                onClick={() => navigate('prev')}
              />
              <div
                className={s.calendarHeaderTodayBtn}
                onClick={() => navigate('today')}
              >
                오늘
              </div>
              <Arrow
                direction="right"
                size={26}
                onClick={() => navigate('next')}
              />
            </div>
            <div className={s.calendarTitle}>
              <span className={s.calendarTitleYear}>{currentDate.year}년</span>
              <span className={s.calendarTitleMonth}>
                {currentDate.month}월
              </span>
            </div>
          </div>
        </div>
        <div className={s.calendarSearchBar}>
          <CalendarSearchIcon />
          <input className={s.calendarSearchText} placeholder="검색" />
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: '', end: '' }}
        fixedWeekCount={false}
        height="calc(100% - 80px)"
        dayMaxEventRows
        editable
        selectable
        locale="ko"
        datesSet={handleDatesSet}
        dayCellContent={({ dayNumberText }: DayCellContentArg) =>
          dayNumberText.replace('일', '')
        }
        titleFormat={{ year: 'numeric', month: 'long' }}
        eventContent={({ event }) => <EventContent event={event} />}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        moreLinkText={(num) => `+${num}`}
        events={events}
      />
      {isModalOpen && (
        <CalendarModal onClose={handleModalClose} event={selectedEvent} />
      )}
    </div>
  );
};

export default Calendar;
