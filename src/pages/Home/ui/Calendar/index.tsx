import { useState, useRef, useEffect, useCallback, memo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  DatesSetArg,
  DayCellContentArg,
  EventClickArg,
  CalendarApi,
} from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import { Arrow } from 'shared/icons';
import { CalendarPlusIcon, CalendarSearchIcon } from 'features/Home/ui';
import { CalendarModal, CalendarToggle } from 'features/Home/Calendar';
import { events } from 'entities/calendar/model';
import { Schedule, CalendarEvent } from 'entities/calendar/type';
import * as s from './style.css';
import './root.css';
import theme from 'shared/styles/theme.css';

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
        style={{
          color: isSchedule ? theme.blue[500] : theme.black,
        }}
      >
        {event.title}
      </span>
    </div>
  );
});

const useCalendarNavigation = (calendarRef: React.RefObject<FullCalendar>) => {
  const [calendar, setCalendar] = useState<CalendarApi | null>(null);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendar(calendarRef.current.getApi());
    }
  }, []);

  return {
    navigate: useCallback(
      (action: 'prev' | 'next' | 'today') => {
        if (calendar) {
          calendar[action]();
        }
      },
      [calendar]
    ),
  };
};

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent | undefined
  >();
  const [currentDate, setCurrentDate] = useState({ year: 0, month: 0 });
  const calendarRef = useRef<FullCalendar | null>(null);
  const { navigate } = useCalendarNavigation(calendarRef);

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

  const handleDateClick = useCallback(
    ({ date }: { date: Date }) => {
      const newEvent: Schedule = {
        type: 'Schedule',
        title: '',
        start: date.toISOString(),
        end: date.toISOString(),
        startEditable: true,
        durationEditable: true,
        allDay: true,
        repeatCycle: 'NONE',
        category: 'FIRST',
      };
      handleModalOpen(newEvent);
    },
    [handleModalOpen]
  );

  const handleEventClick = useCallback(
    (info: EventClickArg) => {
      const clickedEvent = info.event;
      const { type, ...props } = clickedEvent.extendedProps;

      const baseEvent = {
        title: clickedEvent.title,
        start: clickedEvent.startStr,
        end: clickedEvent.endStr,
        startEditable: true,
        repeatCycle: props.repeatCycle || 'NONE',
        content: props.content,
        location: props.location,
      };

      const eventData =
        type === 'Schedule'
          ? {
              ...baseEvent,
              type: 'Schedule' as const,
              durationEditable: true,
              allDay: clickedEvent.allDay,
              category: props.category || 'FIRST',
            }
          : {
              ...baseEvent,
              type: 'Todo' as const,
              durationEditable: false,
              priority: props.priority || 'MIDDLE',
            };

      handleModalOpen(eventData);
    },
    [handleModalOpen]
  );

  const handleDatesSet = ({ view }: DatesSetArg) => {
    const date = new Date(view.currentStart);
    setCurrentDate({ year: date.getFullYear(), month: date.getMonth() + 1 });
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
        dayMaxEventRows={true}
        expandRows={true}
        editable
        selectable
        locale="ko"
        datesSet={handleDatesSet}
        dayCellContent={({ dayNumberText }: DayCellContentArg) =>
          dayNumberText.replace('일', '')
        }
        titleFormat={{ year: 'numeric', month: 'long' }}
        eventContent={({ event }) => <EventContent event={event} />}
        dayMaxEvents={3}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        moreLinkText={(num) => `+${num}`}
      />
      {isModalOpen && (
        <CalendarModal onClose={handleModalClose} event={selectedEvent} />
      )}
    </div>
  );
};

export default Calendar;
