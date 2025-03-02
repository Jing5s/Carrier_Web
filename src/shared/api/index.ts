import axios from 'axios';
import { Storage } from 'shared/lib/storage';
import { refreshToken } from './header';
import { TOKEN } from 'shared/constants';

export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_KEY,
  timeout: 10000,
});

const refresh = async () => {
  Storage.delItem(TOKEN.ACCESS);
  const { data } = await customAxios.post('/auth/reissue', refreshToken());
  const newAccessToken = data.accessToken;
  Storage.setItem(TOKEN.ACCESS, newAccessToken);
  return newAccessToken;
};

customAxios.interceptors.request.use((config) => {
  const token = Storage.getItem(TOKEN.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    request.retryCount = (request.retryCount || 0) + 1;

    if (request.retryCount > 3) {
      return Promise.reject(error);
    }

    if (!request.sent) {
      request.sent = true;
      request.headers.Authorization = await refresh();
      return customAxios(request);
    }
    return Promise.reject(error);
  }
);

customAxios.interceptors.request.use((config) => {
  const token = Storage.getItem(TOKEN.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
