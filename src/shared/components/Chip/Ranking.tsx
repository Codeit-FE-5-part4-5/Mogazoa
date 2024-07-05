import { hexToRgb } from '@/shared/utils/hexToRgb';

interface RankingProps {
  ranking: number;
}

const chipColorList = ['#ff2f9f', '#05d58b', '#9fa6b2'];

export default function Ranking({ ranking }: RankingProps) {
  const { r, g, b } = hexToRgb(chipColorList[ranking - 1]);

  return (
    <div
      className={`flex w-fit rounded-[16px] bg-var-gray2 px-[6px] py-[2px] md:px-[8px]`}
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)`,
        color: chipColorList[ranking - 1],
      }}
    >
      <span className="text-[10px] md:text-[12px]">{ranking}등</span>
    </div>
  );
}
