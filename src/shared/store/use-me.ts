import { create } from 'zustand';
import { Me, MeStore } from '../types/user/user';
import { removeCookie } from '../utils/cookie';

const initUserInfo = {
  updatedAt: '',
  createdAt: '',
  teamId: '',
  image: '',
  description: '',
  nickname: '',
  id: 0,
  mostFavoriteCategory: {
    name: '',
    id: 0,
  },
  averageRating: 0,
  reviewCount: 0,
  followeesCount: 0,
  followersCount: 0,
  isFollowing: false,
};

const useMe = create<MeStore>((set: any) => ({
  userInfo: initUserInfo,
  isLoggedIn: false,
  login: (userInfo: Me) => set({ userInfo, isLoggedIn: true }),
  logout: () => {
    removeCookie('accessToken', { path: '/' });
    set({ userInfo: initUserInfo, isLoggedIn: false });
    window.location.href = '/';
  },
}));

export default useMe;
