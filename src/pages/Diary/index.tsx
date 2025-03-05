import * as s from './style.css';
import NavigationBar from 'features/diary/NavigationBar';
import Content from 'features/diary/Content';
import Chatbar from 'features/diary/Chatbar';

const Diary = () => {
  return (
    <div className={s.container}>
      <NavigationBar />
      <div className={s.main}>
        <Content />
        <Chatbar />
      </div>
    </div>
  );
};

export default Diary;
