import { useMemo, useState } from 'react';
import { Arrow } from 'shared/icons';
import * as s from './style.css';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(
    new Date().getDate()
  );

  const { startWeek, daysInMonth, prevEndOfMonth } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const prevEndOfMonth = new Date(year, month, 0);

    return {
      startWeek: startOfMonth.getDay(),
      daysInMonth: endOfMonth.getDate(),
      prevEndOfMonth: prevEndOfMonth.getDate(),
    };
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const renderDays = useMemo(() => {
    const days = [];

    for (let i = startWeek - 1; i >= 0; i--) {
      const isSunday = (startWeek - i - 1) % 7 === 0;
      days.push(
        <div
          key={`prev-${i}`}
          className={s.MiniCalendarEmptyDay}
          style={{
            color:
              isSunday && selectedDate !== prevEndOfMonth - i
                ? 'red'
                : undefined,
          }}
        >
          {prevEndOfMonth - i}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSunday = (startWeek + i - 1) % 7 === 0;
      days.push(
        <div
          key={`day-${i}`}
          className={`${s.MiniCalendarDay} ${
            selectedDate === i ? s.MiniCalendarSelectedDay : ''
          }`}
          style={{
            color: isSunday && selectedDate !== i ? 'red' : undefined,
          }}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    const remainingDays = 7 - ((startWeek + daysInMonth) % 7 || 7);
    for (let i = 1; i <= remainingDays; i++) {
      const isSunday = (startWeek + daysInMonth + i - 1) % 7 === 0;
      days.push(
        <div
          key={`next-${i}`}
          className={s.MiniCalendarEmptyDay}
          style={{ color: isSunday && selectedDate !== i ? 'red' : undefined }}
        >
          {i}
        </div>
      );
    }

    return days;
  }, [startWeek, daysInMonth, prevEndOfMonth, selectedDate]);

  return (
    <div className={s.MiniCalendarContainer}>
      <div className={s.MiniCalendarHeader}>
        <button onClick={handlePrevMonth}>
          <Arrow direction="left" />
        </button>
        <div className={s.MiniCalendarTitle}>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <button onClick={handleNextMonth}>
          <Arrow direction="right" />
        </button>
      </div>
      <div className={s.MiniCalendarGrid}>
        {WEEKDAYS.map((day, index) => (
          <div
            key={`week-${index}`}
            className={s.MiniCalendarWeek}
            style={{ color: index === 0 ? 'red' : undefined }}
          >
            {day}
          </div>
        ))}
        {renderDays}
      </div>
    </div>
  );
};

export default MiniCalendar;
