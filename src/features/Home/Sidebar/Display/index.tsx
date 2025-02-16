import { useState } from 'react';
import * as s from './style.css';

const Display = () => {
  const [scheduleSelected, setScheduleSelected] = useState(false);
  const [todoSelected, setTodoSelected] = useState(false);

  const toggleScheduleSelected = () => {
    setScheduleSelected((prevSelected) => !prevSelected);
  };

  const toggleTodoSelected = () => {
    setTodoSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className={s.DisplayContainer}>
      <div className={s.DisplayObject}>
        <div className={s.DisplayTitle}>일정 표시</div>
        <div
          className={s.DisplayBtnLayout({ isActive: scheduleSelected })}
          onClick={toggleScheduleSelected}
        >
          <div className={s.DisplayBtnObject}></div>
        </div>
      </div>
      <div className={s.DisplayObject}>
        <div className={s.DisplayTitle}>할 일 표시</div>
        <div
          className={s.DisplayBtnLayout({ isActive: todoSelected })}
          onClick={toggleTodoSelected}
        >
          <div className={s.DisplayBtnObject}></div>
        </div>
      </div>
    </div>
  );
};

export default Display;
