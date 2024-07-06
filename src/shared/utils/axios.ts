import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const apiInstance = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/5-5/',
});

apiInstance.interceptors.request.use((configOrigin) => {
  const config = configOrigin;
  if (typeof window !== 'undefined') {
    const token = cookies.get('token');

    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiInstance.interceptors.response.use(
  (configOrigin) => {
    const config = configOrigin;

    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      cookies.remove('token', { path: '/' });
      window.location.href = '/signin';
    } else {
      console.log(error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export default apiInstance;
