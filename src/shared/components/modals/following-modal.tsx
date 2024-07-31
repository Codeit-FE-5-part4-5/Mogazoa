import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import useModal from '@/shared/store/use-modal-store';
import useGetMe from '@/models/auth/useGetMe';
import { useRouter } from 'next/router';
import useGetUserFollowees from '@/models/user/follow/followees/useGetUserFollowees';
import { FolloweeItem } from '@/shared/types/follow/followees/followees-type';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';

const FollowingModal = () => {
  const router = useRouter();
  const path = router.pathname;

  const [ref, inView] = useInView();

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'following';

  const { data: user } = useGetMe();

  let userId: number | undefined;

  if (path === '/mypage' && user) {
    userId = user.id;
  } else if (router.query.userId) {
    userId = Number(router.query.userId);
  }

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: followees,
  } = useGetUserFollowees(userId);

  const followeesList = followees?.pages.flatMap((page) => page.list) || [];

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[calc(100%-40px)] bg-[#1c1c22] text-var-white md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mb-5 self-start text-xl xl:mb-10 xl:text-2xl">
            유저가 팔로잉하는 유저
          </DialogTitle>
          <DialogDescription />
          <div className="flex flex-col gap-y-6">
            {isFetching && (
              <div className="flex justify-center py-4">
                <Spinner isLoading />
              </div>
            )}
            {followeesList.length === 0 ? (
              <div>팔로잉하는 유저가 없습니다.</div>
            ) : (
              followeesList?.map((followee: FolloweeItem) => {
                return (
                  <div
                    className="flex cursor-pointer items-center gap-x-5"
                    key={followee?.id}
                    onClick={() => {
                      router.push(`/user/${followee?.followee?.id}`);
                      onClose();
                    }}
                  >
                    <Avatar>
                      <AvatarImage
                        className="w-[48px] xl:w-[52px]"
                        src={followee?.followee?.image}
                      />
                      <AvatarFallback>
                        {followee?.followee?.nickname}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-base text-var-white xl:text-lg">
                      {followee?.followee?.nickname}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={ref} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingModal;
