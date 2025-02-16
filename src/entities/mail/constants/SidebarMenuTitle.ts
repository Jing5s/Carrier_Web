export const MENU_TITLES = {
  RECIEVED: '받은 메일함',
  BUSINESS: '업무',
  SPAM: '스팸',
  SAVE: '임시 보관함',
  SENT: '보낸 메일함',
  TRASH: '휴지통',
} as const;

export type SidebarMenuTitle = (typeof MENU_TITLES)[keyof typeof MENU_TITLES];
