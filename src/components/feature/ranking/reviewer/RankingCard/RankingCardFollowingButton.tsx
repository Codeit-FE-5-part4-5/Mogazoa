import { FOLLOWING_STATUS } from '@/constants/following';
import { cn } from '@/lib/cn';
import { ComponentPropsWithoutRef } from 'react';
import { FollowingStatus } from './RankingCard';

interface FollowingButtonProps extends ComponentPropsWithoutRef<'button'> {
  buttonStatus: FollowingStatus;
}

const FollowingButton = ({
  className,
  buttonStatus,
  children,
  ...props
}: FollowingButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'flex justify-center self-end rounded-[16px] border border-var-black3 px-[8px] py-[4px] text-[12px] transition-colors duration-300 active:bg-var-blue xl:ml-auto xl:self-center',
        buttonStatus === FOLLOWING_STATUS.FOLLOWING &&
          'bg-var-black3 text-var-gray1',
        buttonStatus === FOLLOWING_STATUS.FOLLOW &&
          'border-var-gray1 hover:border-var-indigo hover:bg-var-indigo hover:text-var-white',
        buttonStatus === FOLLOWING_STATUS.UNFOLLOW &&
          'hover:border-var-red hover:bg-var-red/5 hover:text-var-red',
      )}
    >
      {children}
    </button>
  );
};

export default FollowingButton;
