export const FOLLOWING_STATUS = {
  ME: '나',
  FOLLOW: '팔로우',
  FOLLOWING: '팔로잉',
  UNFOLLOW: '언팔로우',
};

export type FollowingStatus =
  (typeof FOLLOWING_STATUS)[keyof typeof FOLLOWING_STATUS];
