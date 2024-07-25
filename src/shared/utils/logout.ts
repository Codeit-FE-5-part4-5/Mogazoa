import { removeCookie } from './cookie';

const logout = () => {
  removeCookie('accessToken', { path: '/' });
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
};

export default logout;
