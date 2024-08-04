import Link from 'next/link';
import Image from 'next/image';
import React, { MouseEvent, useEffect, useState } from 'react';
import convertToK from '@/utils/convertToK';
import { FollowerRanking } from '@/types/follow/followers/followers-type';
import { Ranking } from '@/components/shared';
import queryClient from '@/lib/query';
import { useToast } from '@/components/shared/ui/use-toast';
import usePostFollow from '@/models/queries/user/follow/post-follow/usePostFollow';
import useCancelFollow from '@/models/queries/user/follow/cancel-follow/useCancelFollow';
import { Me } from '@/types/user/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import userProfileService from '@/models/services/profile/userProfileService';
import { useChangeRouter } from '@/hooks';
import FollowingButton from './RankingCardFollowingButton';

type RankingCardType = Omit<
  FollowerRanking,
  'updatedAt' | 'createdAt' | 'teamId'
> & {
  ranking: number;
};

export type TButtonText = '언팔로우' | '팔로우' | '팔로잉' | '내 프로필';

const RankingCard = ({
  image,
  nickname,
  description,
  reviewCount,
  followersCount,
  ranking,
  id,
}: RankingCardType) => {
  const [buttonText, setButtonText] = useState<TButtonText>('팔로우');
  const { handleRedirect } = useChangeRouter();
  const { toast } = useToast();
  const followMutation = usePostFollow();
  const unfollowMutation = useCancelFollow();
  const me = queryClient.getQueryData<Me>(['me']);
  const { data: user } = useSuspenseQuery(
    userProfileService.queryOptions(Number(id)),
  );

  useEffect(() => {
    if (id === me?.id) {
      setButtonText('내 프로필');
    } else if (user?.isFollowing) {
      setButtonText('팔로잉');
    } else {
      setButtonText('팔로우');
    }
  }, [user, me?.id, id]);

  const postFollow = async () => {
    try {
      await unfollowMutation.mutateAsync({
        userId: id,
      });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '에러가 발생했습니다.',
      });
    }
  };

  const removeFollow = async () => {
    try {
      await followMutation.mutateAsync({
        userId: id,
      });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: error.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '알 수 없는 에러가 발생했습니다.',
        });
      }
    }
  };

  const handleClickFollow = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (buttonText === '내 프로필') {
      handleRedirect('/mypage');
    } else if (user?.isFollowing) {
      await postFollow();
    } else {
      await removeFollow();
    }
  };

  return (
    <Link href={`/user/${id}`} className="flex-shrink-0 xl:w-full">
      <div className="flex w-full items-center gap-[8px] rounded-2xl px-[20px] py-[10px] text-var-white transition-all duration-300 hover:bg-[#252530]">
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
          <FollowingButton
            isFollowing={user?.isFollowing}
            buttonText={buttonText}
            setButtonText={setButtonText}
            handleClickFollow={handleClickFollow}
          />
        </div>
      </div>
    </Link>
  );
};

export default RankingCard;
