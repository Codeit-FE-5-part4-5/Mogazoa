interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface ReviewImage {
  id: number;
  source: string;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  productId: number;
  user: User;
  reviewImages: ReviewImage[];
  isLiked: boolean;
  find: (callback: (item: Review) => boolean) => Review | undefined;
}

export interface ReviewDetail {
  list: Review[];
  nextCursor: number;
}
