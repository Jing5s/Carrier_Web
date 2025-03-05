import * as s from './style.css';
import { ArrowBarIcon } from 'features/diary/ui';
import { NowDatePeriod, getPrevDate, getNextDate } from 'shared/lib/date';
import { useState, useMemo } from 'react';

const NavigationBar = () => {
  const [currentDate, setCurrentDate] = useState(NowDatePeriod);

  const baseDate = useMemo(() => getPrevDate(currentDate, 2), [currentDate]);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => getNextDate(baseDate, i)),
    [baseDate]
  );

  const nextPeriodDay = useMemo(() => {
    const nextDate = new Date(getNextDate(currentDate, 5).replace(/\./g, '-'));
    return nextDate.getDate();
  }, [currentDate]);

  const handlePrevWeek = () => {
    setCurrentDate(getPrevDate(currentDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate(getNextDate(currentDate, 7));
  };

  const handleDateSelection = (day: string) => {
    setCurrentDate(day);
  };

  return (
    <div className={s.container}>
      <div className={s.buttonContainer}>
        <div className={s.buttonBox} onClick={handlePrevWeek}>
          <ArrowBarIcon direction="left" />
          <div className={s.buttonText}>저번 주</div>
        </div>
      </div>
      <div className={s.datesContainer}>
        {days.map((day, index) => {
          const dayNumber = day.split('.')[2].replace(/^0+/, '');
          const isToday = day === currentDate;
          const dateObj = new Date(day.replace(/-/g, '.'));
          const isHoliday = [0, 6].includes(dateObj.getDay());

          return (
            <div
              key={index}
              className={s.dayContainer}
              onClick={() => handleDateSelection(day)}
            >
              <div className={s.dayBox({ selected: isToday })}>
                <div className={s.dayText({ isHoliday, selected: isToday })}>
                  {dayNumber}
                </div>
              </div>
              <div className={s.dayDairyText({ isWritten: false })}>
                일기 없음
              </div>
            </div>
          );
        })}
      </div>
      <div className={s.buttonContainer}>
        <div className={s.buttonBox} onClick={handleNextWeek}>
          <div className={s.dayBox()}>
            <div className={s.dayText({ disabled: true })}>{nextPeriodDay}</div>
          </div>
          <ArrowBarIcon direction="right" />
          <div className={s.buttonText}>다음 주</div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
