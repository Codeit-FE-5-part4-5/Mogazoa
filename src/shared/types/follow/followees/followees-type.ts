export interface Followee {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface FolloweeItem {
  followee: Followee;
  id: number;
}

export interface Followees {
  nextCursor: number;
  list: FolloweeItem[];
}
