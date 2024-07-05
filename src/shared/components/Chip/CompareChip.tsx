import { hexToRgb } from '@/shared/utils/hexToRgb';
import Image from 'next/image';

export enum ORDER_POSITION {
  left = 0,
  right = 1,
}

interface CompareChipProps {
  name: string;
  orderPosition: ORDER_POSITION;
  onClick: () => void;
}

const productColorList = ['#05d58b', '#ff2f9f'];

export default function CompareChip({
  name,
  orderPosition,
  onClick,
}: CompareChipProps) {
  const { r, g, b } = hexToRgb(productColorList[orderPosition]);
  return (
    <button
      className="flex w-fit items-center gap-[10px] rounded-[6px] px-[10px] py-[8px]"
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)`,
        color: productColorList[orderPosition],
      }}
    >
      <span className="text-[14px] md:text-[16px]">{name}</span>
      <button
        className="size-[17px] rounded-[6px] bg-var-black1 p-[2px] md:size-[19px]"
        onClick={onClick}
      >
        <Image src="/close.svg" alt="삭제 버튼" width={15} height={15} />
      </button>
    </button>
  );
}
