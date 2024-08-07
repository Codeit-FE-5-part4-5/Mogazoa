// eslint-disable-next-line import/prefer-default-export
export const REVIEW_SORT_ORDER = {
  최신순: 'recent',
  '평점 높은 순': 'ratingDesc',
  '평점 낮은 순': 'ratingAsc',
  '좋아요 순': 'likeCount',
} as const;

export const REVIEW_ORDER_LIST = [
  '최신순',
  '평점 높은 순',
  '평점 낮은 순',
  '좋아요 순',
];
