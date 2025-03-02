import { atom } from 'jotai';

export const userContext = atom({
  email: '',
  nickname: '',
  picture: '',
  isLoggedIn: false,
});

export default userContext;
