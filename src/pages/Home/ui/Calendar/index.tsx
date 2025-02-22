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
import { events } from 'entities/calendar/model';
import { CalendarEvent } from 'entities/calendar/type';
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
        style={{ color: isSchedule ? theme.blue[500] : theme.black }}
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

  const handleDateClick = useCallback(({ date }: { date: Date }) => {
    handleModalOpen({
      type: 'Schedule',
      title: '',
      startDate: date.toISOString(),
      endDate: date.toISOString(),
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
      startDate: info.event.startStr,
      endDate: info.event.endStr,
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
