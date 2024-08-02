import queryClient from '@/lib/query';
import { removeCookie } from './cookie';

const logout = () => {
  removeCookie('accessToken', { path: '/' });
  // eslint-disable-next-line no-alert
  queryClient.resetQueries();
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
};

export default logout;
