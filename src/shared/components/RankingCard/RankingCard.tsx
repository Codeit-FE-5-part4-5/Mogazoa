import React from 'react';
import Ranking from '../Chip/Ranking';
import Image from 'next/image';

// 기존 ranking을 어떻게 불러올지 모르므로 일단 any로 타입을 지정함.
// 사용할 때 수정필요

const RankingCard = ({ mockRanking }: any) => {
  const { img, alt, name, follower, review } = mockRanking;

  return (
    <div className="flex flex-shrink-0 items-center gap-2.5">
      <div className="relative flex size-[42px] rounded-full bg-blue-50">
        <Image src={img} alt={alt} fill />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Ranking ranking={0} />
          <div className="text-[14px] font-normal text-var-white md:text-[16px]">
            {name}
          </div>
        </div>
        <ul className="flex gap-3.5 text-[10px] font-light text-var-gray1 md:text-[12px]">
          <li>팔로워 {follower}</li>
          <li>리뷰 {review}</li>
        </ul>
      </div>
    </div>
  );
};

export default RankingCard;
