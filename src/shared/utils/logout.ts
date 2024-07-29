import { removeCookie } from './cookie';
import queryClient from '../providers/query-client-provider';

const logout = () => {
  removeCookie('accessToken', { path: '/' });
  // eslint-disable-next-line no-alert
  queryClient.removeQueries({ queryKey: ['me'] });
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
};

export default logout;
