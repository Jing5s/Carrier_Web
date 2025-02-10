import * as s from './style.css';
import { Arrow } from 'shared/icons';
import { Business, Recieved, Save, Sent, Spam, Trash } from 'pages/Mail/ui';
import { useMenuState } from 'pages/Mail/hooks';
import theme from 'shared/styles/theme.css';
import { MENU_TITLES } from 'pages/Mail/constants/SidebarMenuTitle';

const Sidebar = () => {
  const { selectedMenu, selectMenu, isOpened, toggleOpened } = useMenuState();

  const sidebarMenu = [
    { title: MENU_TITLES.SAVE, icon: <Save /> },
    {
      title: MENU_TITLES.SENT,
      icon: <Sent fill={theme.blue[500]} />,
    },
    { title: MENU_TITLES.TRASH, icon: <Trash /> },
  ];

  const subMenu = [
    { title: MENU_TITLES.BUSINESS, icon: <Business /> },
    { title: MENU_TITLES.SPAM, icon: <Spam /> },
  ];

  return (
    <aside className={s.container}>
      <p className={s.emailText}>chltjdgns1009@gmail.com</p>

      <div className={s.categories}>
        <div
          className={`${s.category} ${selectedMenu === MENU_TITLES.RECIEVED ? s.selected : ''}`}
          onClick={() => selectMenu(MENU_TITLES.RECIEVED)}
        >
          <Recieved />
          <p className={s.categoryText}>{MENU_TITLES.RECIEVED}</p>

          <div
            className={`${s.arrowBox} ${isOpened ? s.opened : s.closed}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleOpened();
            }}
          >
            <Arrow size={20} direction="right" />
          </div>
        </div>

        {isOpened && (
          <div className={s.subCategories}>
            {subMenu.map((menu) => (
              <div
                className={`${s.category} ${menu.title === selectedMenu ? s.selected : ''}`}
                key={menu.title}
                onClick={() => selectMenu(menu.title)}
              >
                {menu.icon}
                <p className={s.categoryText}>{menu.title}</p>
              </div>
            ))}
          </div>
        )}

        {sidebarMenu.map((menu) => (
          <div
            className={`${s.category} ${menu.title === selectedMenu ? s.selected : ''}`}
            key={menu.title}
            onClick={() => selectMenu(menu.title)}
          >
            {menu.icon}
            <p className={s.categoryText}>{menu.title}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
