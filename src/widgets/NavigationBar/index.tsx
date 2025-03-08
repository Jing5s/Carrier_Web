import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './style.css';
import { Alarm, Calendar, Diary, Mail } from 'widgets/NavigationBar/ui';
import useUser from 'features/userCheck/hooks/useUser';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const menus = [
    {
      icon: <Calendar />,
      link: '/',
      label: '캘린더',
    },
    {
      icon: <Mail />,
      link: '/mail',
      label: '이메일',
    },
    {
      icon: <Diary />,
      link: '/diary',
      label: '일기',
    },
  ];

  return (
    <nav className={s.container}>
      <div className={s.menus}>
        {menus.map((menu) => (
          <div
            key={menu.link}
            className={`${s.icon} ${location.pathname === menu.link ? s.active : ''}`}
            onClick={() => {
              navigate(menu.link);
            }}
          >
            {menu.icon}
            <p className={s.label}>{menu.label}</p>
          </div>
        ))}
      </div>
      <div className={s.others}>
        <img
          src={user.picture}
          className={s.profileImg}
          alt="프로필 사진"
          onClick={() => {
            navigate('/setting');
          }}
        />
        <Alarm />
      </div>
    </nav>
  );
};

export default NavigationBar;
