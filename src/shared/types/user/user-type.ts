export interface UserType {
  id: number;
  nickname: string;
  description: string;
  image: string | null;
  isFollowing: boolean;
  followersCount: number;
  followeesCount: number;
  reviewCount: number;
  averageRating: number;
  mostFavoriteCategory: {
    id: number;
    name: string;
  } | null;
}
