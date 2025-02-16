import { Category, Display, MiniCalendar, Todo } from 'features/Home/Sidebar';
import * as s from './style.css';

const SideBar = () => {
  return (
    <aside className={s.container}>
      <MiniCalendar />
      <Display />
      <Todo />
      <Category />
    </aside>
  );
};

export default SideBar;
