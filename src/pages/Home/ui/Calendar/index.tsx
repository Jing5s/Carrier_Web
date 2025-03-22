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
import { useQueryClient } from '@tanstack/react-query';
import { Arrow } from 'shared/icons';
import { CalendarPlusIcon, CalendarSearchIcon } from 'features/Home/ui';
import { CalendarModal, CalendarToggle } from 'features/Home/Calendar';
import { CalendarEvent } from 'entities/calendar/type';
import * as s from './style.css';
import './root.css';
import theme from 'shared/styles/theme.css';
import {
  useScheduleListQuery,
  useTodoListQuery,
} from 'features/Home/services/home.query';
import { useAtom } from 'jotai';
import {
  scheduleSelectedAtom,
  todoSelectedAtom,
} from 'entities/calendar/contexts/eventDisplayState';
import { scheduleRenderingAtom } from 'entities/calendar/contexts/eventRendering';
import { todoRenderingAtom } from 'entities/calendar/contexts/eventRendering';

const EventContent = memo(({ event }: { event: EventImpl }) => {
  const isSchedule = event.extendedProps.type === 'Schedule';
  const isDone = event.extendedProps.isDone === true;
  return (
    <div
      className={
        isSchedule ? s.calendarScheduleContainer : s.calendarTodoContainer
      }
    >
      <span
        className={
          isSchedule ? s.calendarScheduleText : s.calendarTodoText({ isDone })
        }
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
  }, [calendarRef]);

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
  const queryClient = useQueryClient();

  const [scheduleSelected] = useAtom(scheduleSelectedAtom);
  const [todoSelected] = useAtom(todoSelectedAtom);

  const [scheduleRendering] = useAtom(scheduleRenderingAtom);
  const [todoRendering] = useAtom(todoRenderingAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (!dateRange) return;

      try {
        const [schedules, todos] = await Promise.all([
          queryClient.fetchQuery(
            useScheduleListQuery.getScheduleList({
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
            })
          ),
          queryClient.fetchQuery(
            useTodoListQuery.getTodoList({
              startDate: dateRange.startDate.split('T')[0],
              endDate: dateRange.endDate.split('T')[0],
            })
          ),
        ]);

        setEvents([...schedules, ...todos]);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, [queryClient, dateRange, scheduleRendering, todoRendering]);

  const filteredEvents = events.filter((event) => {
    if (event.type === 'Schedule' && !scheduleSelected) return false;
    if (event.type === 'Todo' && !todoSelected) return false;
    return true;
  });

  const toggleCalendar = useCallback(
    () => setIsToggleVisible((prev) => !prev),
    []
  );
  const handleModalOpen = useCallback((event?: CalendarEvent) => {
    const startDate = event?.start ? new Date(event.start) : new Date();
    const endDate = event?.end ? new Date(event.end) : new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return;
    }

    setSelectedEvent({
      ...event,
      type: event?.type ?? 'Schedule',
      start: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString(),
      end: new Date(endDate.setDate(endDate.getDate() + 1)).toISOString(),
    } as CalendarEvent);

    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
  }, []);

  const handleDateClick = useCallback(
    ({ date }: { date: Date }) => {
      handleModalOpen({
        type: 'Schedule',
        title: '',
        memo: '',
        start: date.toISOString(),
        end: date.toISOString(),
        startEditable: true,
        durationEditable: true,
        allDay: true,
        isRepeat: false,
        category: 1,
        location: null,
      });
    },
    [handleModalOpen]
  );

  const handleEventClick = useCallback(
    (info: EventClickArg) => {
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
    },
    [handleModalOpen]
  );

  const handleDatesSet = ({ view }: DatesSetArg) => {
    setCurrentDate({
      year: view.currentStart.getFullYear(),
      month: view.currentStart.getMonth() + 1,
    });
  };

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
        dayMaxEvents={3}
        moreLinkText={(num) => `+${num}`}
        events={filteredEvents}
      />
      {isModalOpen && (
        <CalendarModal onClose={handleModalClose} event={selectedEvent} />
      )}
    </div>
  );
};

export default Calendar;
