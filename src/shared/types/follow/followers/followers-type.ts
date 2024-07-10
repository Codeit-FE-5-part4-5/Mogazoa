export interface Follower {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface FollowerItem {
  follower: Follower;
  id: number;
}

export interface Followers {
  nextCursor: number;
  list: FollowerItem[];
}
