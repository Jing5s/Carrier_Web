import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './style.css';
import { Alarm, Calendar, Diary, Mail } from 'widgets/NavigationBar/ui';
import useUser from 'entities/user/hooks/useUser';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const menus = [
    {
      icon: <Calendar />,
      link: '/',
    },
    {
      icon: <Mail />,
      link: '/mail',
    },
    {
      icon: <Diary />,
      link: '/diary',
    },
  ];

  return (
    <nav className={s.container}>
      <div className={s.icons}>
        {menus.map((menu) => (
          <div
            key={menu.link}
            className={`${s.icon} ${location.pathname === menu.link ? s.active : ''}`}
            onClick={() => {
              navigate(menu.link);
            }}
          >
            {menu.icon}
          </div>
        ))}
      </div>
      <div className={s.others}>
        <img src={user.picture} className={s.profileImg} alt="프로필 사진" />
        <Alarm />
      </div>
    </nav>
  );
};

export default NavigationBar;
