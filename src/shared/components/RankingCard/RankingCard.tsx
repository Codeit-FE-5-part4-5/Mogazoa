import React from 'react';
import Ranking from '../Chip/Ranking';
import Image from 'next/image';
import { FollowerRanking } from '@/shared/types/follow/followers/followers-type';

type RankingCardType = Omit<
  FollowerRanking,
  'updatedAt' | 'createdAt' | 'teamId' | 'id'
> & {
  ranking: number;
};

const RankingCard = ({
  image,
  nickname,
  description,
  reviewCount,
  followersCount,
  ranking,
}: RankingCardType) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-2.5">
      <div className="relative flex size-[42px] overflow-hidden rounded-full border border-var-gray1">
        <Image
          src={image || 'images/user-no-image.svg'}
          alt={description || '이미지 없음'}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Ranking ranking={ranking} />
          <div className="text-[14px] font-normal text-var-white md:text-[16px]">
            {nickname}
          </div>
        </div>
        <ul className="flex gap-3.5 text-[10px] font-light text-var-gray1 md:text-[12px]">
          <li>팔로워 {followersCount}</li>
          <li>리뷰 {reviewCount}</li>
        </ul>
      </div>
    </div>
  );
};

export default RankingCard;
