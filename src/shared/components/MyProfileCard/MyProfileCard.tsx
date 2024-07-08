import Image from 'next/image';
import Button from '../Button/Button';
import { useModal } from '@/shared/hooks/use-modal-store';

export default function MyProfileCard() {
  const { onOpen } = useModal();

  return (
    <div className="xl: flex flex-col items-center gap-[30px] rounded-[12px] border border-var-black3 bg-var-black2 px-[20px] py-[30px] text-[14px] text-var-white md:px-[30px] xl:gap-[40px] xl:px-[20px] xl:pt-[40px]">
      <Image
        src="/images/image 3.png"
        alt="프로필 이미지"
        width={120}
        height={120}
        className="rounded-[50%]"
      />
      <h1 className="text-[20px] font-semibold">삼다수</h1>
      <p className="text-var-gray1">하이! 난 제주 삼다수</p>
      <div className="flex w-full">
        <div
          className="flex flex-1 cursor-pointer flex-col items-center border-r border-var-black3"
          onClick={() => onOpen('follow')}
        >
          <span className="text-[18px]">115</span>
          <span>팔로워</span>
        </div>
        <div
          className="flex flex-1 cursor-pointer flex-col items-center"
          onClick={() => onOpen('follow')}
        >
          <span className="text-[18px]">98</span>
          <span>팔로잉</span>
        </div>
      </div>
      <div className="w-full space-y-5">
        <Button text="프로필 편집" onClick={() => onOpen('profileEdit')} />
        <Button text="로그아웃" variant="tertiary" />
      </div>
    </div>
  );
}
