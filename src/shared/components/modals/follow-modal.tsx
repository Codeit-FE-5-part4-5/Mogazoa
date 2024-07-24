import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import useModal from '@/shared/store/use-modal-store';
import useGetMe from '@/shared/models/auth/useGetMe';
import useGetUserFollowers from '@/shared/models/user/follow/followers/useGetUserFollowers';
import { FollowerItem } from '@/shared/types/follow/followers/followers-type';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';

const FollowModal = () => {
  const router = useRouter();
  const path = router.pathname;

  const [ref, inView] = useInView();

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'follow';

  const { data: user } = useGetMe();

  let userId: number | undefined;

  if (path === '/mypage' && user && user.data) {
    userId = user.data.id;
  } else if (router.query.userId) {
    userId = Number(router.query.userId);
  }

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: followers,
  } = useGetUserFollowers(userId);

  const followersList = followers?.pages.flatMap((page) => page.list) || [];

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-h-screen w-full max-w-[calc(100%-40px)] overflow-y-scroll bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-5 self-start text-xl xl:mb-10 xl:text-2xl">
            유저를 팔로우하는 유저
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="flex flex-col gap-y-6">
          {isFetching && (
            <div className="flex justify-center py-4">
              <Spinner isLoading />
            </div>
          )}
          {followersList.length === 0 ? (
            <div>팔로우하는 유저가 없습니다.</div>
          ) : (
            followersList?.map((follower: FollowerItem) => {
              return (
                <div
                  className="flex cursor-pointer items-center gap-x-5"
                  key={follower?.id}
                  onClick={() => {
                    router.push(`/user/${follower?.follower?.id}`);
                    onClose();
                  }}
                >
                  <Avatar>
                    <AvatarImage
                      className="w-[48px] xl:w-[52px]"
                      src={follower?.follower?.image}
                    />
                    <AvatarFallback>
                      {follower?.follower?.nickname}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-base text-var-white xl:text-lg">
                    {follower?.follower?.nickname}
                  </div>
                </div>
              );
            })
          )}
          <div ref={ref} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowModal;
