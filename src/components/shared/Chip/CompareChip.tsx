import Image from 'next/image';
import useHexToRgb from '@/hooks/useHexToRgb';

export enum OrderPosition {
  left = 0,
  right = 1,
}

interface CompareChipProps {
  name: string;
  orderPosition: OrderPosition;
  onClick: () => void;
}

const productColorList = ['#05d58b', '#ff2f9f'];

const CompareChip = ({ name, orderPosition, onClick }: CompareChipProps) => {
  const [r, g, b] = useHexToRgb(productColorList[orderPosition]);
  return (
    <div
      className="flex w-fit items-center gap-[10px] rounded-[6px] px-[10px] py-[8px]"
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)`,
        color: productColorList[orderPosition],
      }}
    >
      <span className="text-[14px] md:text-[16px]">{name}</span>
      <button
        type="button"
        className="size-[17px] rounded-[6px] bg-var-black1 p-[2px] md:size-[19px]"
        onClick={onClick}
      >
        <Image src="/close.svg" alt="삭제 버튼" width={15} height={15} />
      </button>
    </div>
  );
};

export default CompareChip;
