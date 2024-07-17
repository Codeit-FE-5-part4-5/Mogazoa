interface User {
  id: number;
  nickname: string;
  image: string;
}

interface ReviewImage {
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
}

export interface ReviewDetail {
  list: Review;
  nextCursor: string | null;
}
