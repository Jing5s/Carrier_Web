import axios from 'axios';
import { Storage } from 'shared/lib/storage';
import { refreshToken } from './header';
import { TOKEN } from 'shared/constants';

export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_KEY,
  timeout: 100000,
});

const refresh = async () => {
  Storage.delItem(TOKEN.ACCESS);
  const { data } = await customAxios.post('/auth/reissue', refreshToken());
  const newAccessToken = data.accessToken;
  Storage.setItem(TOKEN.ACCESS, newAccessToken);
  return newAccessToken;
};

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 400) {
      return Promise.reject(error);
    }

    if (request._retry) {
      return Promise.reject(error);
    }

    try {
      request._retry = true;
      const newToken = await refresh();
      request.headers.Authorization = `Bearer ${newToken}`;
      return customAxios(request);
    } catch (refreshError) {
      Storage.delItem(TOKEN.ACCESS);
      Storage.delItem(TOKEN.REFRESH);
      return Promise.reject(refreshError);
    }
  }
);

// request interceptor는 한 번만 등록
customAxios.interceptors.request.use((config) => {
  const token = Storage.getItem(TOKEN.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
