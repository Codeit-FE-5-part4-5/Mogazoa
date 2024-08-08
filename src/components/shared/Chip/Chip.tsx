import { cn } from '@/lib/cn';
import useHexToRgb from '@/hooks/useHexToRgb';

export const CATEGORY_LIST = [
  { name: '음악', color: '#c5d17c' },
  { name: '영화/드라마', color: '#f75532' },
  { name: '강의/책', color: '#a953ff' },
  { name: '호텔', color: '#49af1a' },
  { name: '가구/인테리어', color: '#d676c1' },
  { name: '식당', color: '#ff7e46' },
  { name: '전자기기', color: '#23b581' },
  { name: '화장품', color: '#fd529a' },
  { name: '의류/악세서리', color: '#757aff' },
  { name: '앱', color: '#3098e3' },
];

type ChipSize = 's' | 'm';

interface ChipProps {
  text: string;
  color?: string;
  size: ChipSize;
}

const chipSizeTypeStyle = {
  s: {
    wrapper: 'px-[8px]',
    text: 'text-[12px] font-[400]',
  },
  m: {
    wrapper: 'px-[10px]',
    text: 'text-[18px] font-[500]',
  },
};

const Chip = ({ text = '음악', color = '#c5d17c', size = 's' }: ChipProps) => {
  const [r, g, b] = useHexToRgb(color);
  return (
    <div
      className={cn(
        'flex w-fit rounded-[6px] py-[4px]',
        chipSizeTypeStyle[size].wrapper,
      )}
      style={{
        backgroundColor: `rgba(${r},${g},${b}, 0.2)`,
        color,
      }}
    >
      <span className={cn(chipSizeTypeStyle[size].text)}>{text}</span>
    </div>
  );
};

export default Chip;
