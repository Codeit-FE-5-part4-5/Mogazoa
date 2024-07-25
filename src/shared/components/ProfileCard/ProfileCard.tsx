import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { UserType } from '@/shared/types/user/user-type';
import useModal from '@/shared/store/use-modal-store';
import usePostFollow from '@/shared/models/user/follow/post-follow/usePostFollow';
import useCancelFollow from '@/shared/models/user/follow/cancel-follow/useCancelFollow';
import { useToast } from '@/components/ui/use-toast';
import Button from '../Button/Button';

interface ProfileCardProps {
  user: UserType;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const { toast } = useToast();
  const { onOpen } = useModal();

  const queryClient = useQueryClient();
  const followMutation = usePostFollow();
  const unfollowMutation = useCancelFollow();

  const handleFollowButton = async () => {
    try {
      await followMutation.mutateAsync({
        userId: user?.id,
      });

      queryClient.invalidateQueries({ queryKey: ['followers'] });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '에러가 발생했습니다.',
      });
    }
  };

  const handleUnfollowButton = async () => {
    try {
      await unfollowMutation.mutateAsync({
        userId: user?.id,
      });

      queryClient.invalidateQueries({ queryKey: ['followers'] });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '에러가 발생했습니다.',
      });
    }
  };

  return (
    <div className="xl: flex flex-col items-center gap-[30px] rounded-[12px] border border-var-black3 bg-var-black2 px-[20px] py-[30px] text-[14px] text-var-white md:px-[30px] xl:gap-[40px] xl:px-[20px] xl:pt-[40px]">
      {user?.image ? (
        <Image
          src={user?.image}
          alt="프로필 이미지"
          width={120}
          height={120}
          className="rounded-[50%] border border-var-gray1"
        />
      ) : (
        <Image
          src="/images/user-no-image.svg"
          alt="프로필 이미지"
          width={120}
          height={120}
          className="rounded-[50%] border border-var-gray1"
        />
      )}
      <h1 className="text-[20px] font-semibold">{user?.nickname}</h1>
      <p className="text-var-gray1">{user?.description}</p>
      <div className="flex w-full">
        <div
          className="flex flex-1 cursor-pointer flex-col items-center border-r border-var-black3"
          onClick={() => onOpen('follow')}
        >
          <span className="text-[18px]">{user?.followersCount}</span>
          <span>팔로워</span>
        </div>
        <div
          className="flex flex-1 cursor-pointer flex-col items-center"
          onClick={() => onOpen('following')}
        >
          <span className="text-[18px]">{user?.followeesCount}</span>
          <span>팔로잉</span>
        </div>
      </div>
      {user?.isFollowing ? (
        <Button
          text="팔로우 취소"
          variant="tertiary"
          onClick={handleUnfollowButton}
        />
      ) : (
        <Button text="팔로우" onClick={handleFollowButton} />
      )}
    </div>
  );
};

export default ProfileCard;
