import axios from 'axios';
import { Storage } from 'shared/lib/storage';
import { refreshToken } from './header';
import { TOKEN } from 'shared/constants';

export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_KEY,
  timeout: 10000,
});

const refresh = async () => {
  const { data } = await customAxios.put('/auth/reissue', null, refreshToken());
  Storage.setItem(TOKEN.ACCESS, data.accessToken);
  return data.accessToken;
};

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (!request.sent) {
      request.sent = true;
      request.headers.Authorization = await refresh();
      return customAxios(request);
    }
    return Promise.reject(error);
  }
);
