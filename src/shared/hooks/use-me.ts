import { create } from 'zustand';
import { Me, MeStore } from '../types/user/user';
import { devtools } from 'zustand/middleware';

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

const store = (set: any) => ({
  userInfo: initUserInfo,
  isLoggedIn: false,
  login: (userInfo: Me) => set({ userInfo, isLoggedIn: true }),
  logout: () => set({ userInfo: initUserInfo }),
});

const useMe = create<MeStore>()(devtools(store));

export default useMe;
