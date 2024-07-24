import React from 'react';
import Image from 'next/image';
import { FollowerRanking } from '@/shared/types/follow/followers/followers-type';
import Link from 'next/link';
import convertToK from '@/shared/models/user/follow/followers/convertToK';
import Ranking from '../Chip/Ranking';

type RankingCardType = Omit<
  FollowerRanking,
  'updatedAt' | 'createdAt' | 'teamId'
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
  id,
}: RankingCardType) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-2.5">
      <div className="relative flex size-[42px] overflow-hidden rounded-full border border-var-gray1">
        <Image
          sizes="40px"
          src={image || 'images/user-no-image.svg'}
          alt={description || '이미지 없음'}
          fill
          style={{
            objectFit: 'contain',
          }}
          loading="eager"
        />
      </div>
      <div>
        <Link href={`/user/${id}`} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Ranking ranking={ranking} />
            <div className="text-[14px] font-normal text-var-white md:text-[16px]">
              {nickname}
            </div>
          </div>
          <ul className="flex gap-3.5 text-[10px] font-light text-var-gray1 md:text-[12px]">
            <li>팔로워 {convertToK(followersCount)}</li>
            <li>리뷰 {convertToK(reviewCount)}</li>
          </ul>
        </Link>
      </div>
    </div>
  );
};

export default RankingCard;
