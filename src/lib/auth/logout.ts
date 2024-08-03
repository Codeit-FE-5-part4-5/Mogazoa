import queryClient from '@/lib/query';
import { removeCookie } from '../cookie';

const logout = () => {
  removeCookie('accessToken', { path: '/' });
  queryClient.resetQueries();
  // eslint-disable-next-line no-alert
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
};

export default logout;
