import axios from 'axios';
import { getCookie, removeCookie } from './cookie';

const apiInstance = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/5-5/',
});

apiInstance.interceptors.request.use(
  (configOrigin) => {
    const config = configOrigin;
    if (typeof window !== 'undefined') {
      const token = getCookie('accessToken');

      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    throw new Error(error);
  },
);

apiInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);
    throw new Error(error);
  },
);

export default apiInstance;
