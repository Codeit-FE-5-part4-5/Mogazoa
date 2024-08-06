import Link from 'next/link';
import Image from 'next/image';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import usePostFollow from '@/models/queries/user/follow/post-follow/usePostFollow';
import userProfileService from '@/models/services/profile/userProfileService';
import useGetMe from '@/models/queries/auth/useGetMe';
import convertToK from '@/utils/convertToK';
import { FOLLOWING_STATUS } from '@/constants/following';
import { FollowerRanking } from '@/types/follow/followers/followers-type';

import useModal from '@/store/use-modal-store';
import { Ranking } from '@/components/shared';
import FollowingButton from './RankingCardFollowingButton';

type RankingCardType = Omit<
  FollowerRanking,
  'updatedAt' | 'createdAt' | 'teamId'
> & {
  ranking: number;
};

export type FollowingStatus =
  (typeof FOLLOWING_STATUS)[keyof typeof FOLLOWING_STATUS];

export type TButtonStatus = FollowingStatus;

const RankingCard = ({
  image,
  nickname,
  description,
  reviewCount,
  followersCount,
  ranking,
  id,
}: RankingCardType) => {
  const [buttonStatus, setButtonStatus] = useState<TButtonStatus>(
    FOLLOWING_STATUS.FOLLOW,
  );
  const { onOpen } = useModal();
  const { mutate: followMutation } = usePostFollow();
  const { data: me } = useGetMe();
  const { data: user } = useQuery(userProfileService.queryOptions(Number(id)));

  useEffect(() => {
    if (user?.isFollowing) {
      setButtonStatus(FOLLOWING_STATUS.FOLLOWING);
    } else {
      setButtonStatus(FOLLOWING_STATUS.FOLLOW);
    }
  }, [user, me?.id, id]);

  const handleClickFollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (me?.id) {
      if (user?.isFollowing) {
        onOpen('unfollow', { userName: nickname, userId: id });
      } else {
        followMutation({ userId: id });
      }
    } else {
      onOpen('login');
    }
  };

  return (
    <Link href={`/user/${id}`} className="flex-shrink-0 xl:w-full">
      <div className="flex w-full items-start gap-[8px] rounded-2xl px-[16px] py-[10px] text-var-white transition-all duration-300 hover:bg-[#252530] xl:px-[20px]">
        <div className="relative flex size-[40px] flex-shrink-0 overflow-hidden rounded-full border border-var-gray1">
          <Image
            src={image || 'images/user-no-image.svg'}
            alt={description || '이미지 없음'}
            style={{
              objectFit: 'contain',
            }}
            fill
            loading="eager"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-[8px] xl:flex-row">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Ranking ranking={ranking} />
              <div className="line-clamp-1 flex-1 text-[14px] font-semibold">
                {nickname}
              </div>
            </div>
            <ul className="flex gap-3.5 text-[10px] font-light text-var-gray1 md:text-[12px]">
              <li>팔로워 {convertToK(followersCount)}</li>
              <li>리뷰 {convertToK(reviewCount)}</li>
            </ul>
          </div>
          {me?.id !== id && (
            <FollowingButton
              buttonStatus={buttonStatus}
              onMouseEnter={() => {
                if (user?.isFollowing)
                  setButtonStatus(FOLLOWING_STATUS.UNFOLLOW);
              }}
              onMouseLeave={() => {
                if (user?.isFollowing)
                  setButtonStatus(FOLLOWING_STATUS.FOLLOWING);
              }}
              onClick={handleClickFollow}
            >
              {buttonStatus}
            </FollowingButton>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RankingCard;
