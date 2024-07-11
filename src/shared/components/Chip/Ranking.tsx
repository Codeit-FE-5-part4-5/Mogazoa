import { useHexToRgb } from '@/shared/hooks/useHexToRgb';

interface RankingProps {
  ranking: number;
}

const chipColorList = ['#ff2f9f', '#05d58b', '#9fa6b2'];

const Ranking = ({ ranking }: RankingProps) => {
  const [r, g, b] = useHexToRgb(chipColorList[ranking < 2 ? ranking : 2]);

  return (
    <div
      className={`flex w-fit rounded-[16px] bg-var-gray2 px-[6px] py-[2px] md:px-[8px]`}
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)`,
        color: chipColorList[ranking] || chipColorList[2],
      }}
    >
      <span className="text-[10px] md:text-[12px]">{ranking + 1}등</span>
    </div>
  );
};

export default Ranking;
