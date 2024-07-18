export interface Me {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
  mostFavoriteCategory: {
    name: string;
    id: number;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface MeStore {
  userInfo: Me;
  isLoggedIn: boolean;
  login: (userInfo: Me) => void;
  logout: () => void;
}
