import { atom } from 'jotai';

export const userContext = atom({
  email: '',
  nickname: '',
  picture: '',
  notificationTime: '',
  isLoggedIn: false,
});

export default userContext;
